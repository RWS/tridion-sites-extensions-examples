using System.Collections.Generic;
using System.Linq;
using Tridion.ContentManager;
using Tridion.ContentManager.CommunicationManagement;
using Tridion.ContentManager.ContentManagement;
using Tridion.ContentManager.Extensibility;
using Tridion.ContentManager.Extensibility.Events;

namespace Example.PublishStatus
{
    [TcmExtension("Publish Status")]
    public class EventHandler : TcmExtension
    {
        public const string ExtensionPropertyName = "PublishInfo";

        public EventHandler()
        {
            EventSystem.Subscribe<IdentifiableObject, SetPublishStateEventArgs>(OnPublishStateUpdated, EventPhases.Processed);
            EventSystem.Subscribe<IdentifiableObject, LoadEventArgs>(OnItemLoaded, EventPhases.TransactionCommitted, EventSubscriptionOrder.Late);
            EventSystem.Subscribe<IdentifiableObject, CopyEventArgs>(OnItemCopied, EventPhases.TransactionCommitted, EventSubscriptionOrder.Late);
            EventSystem.Subscribe<OrganizationalItem, GetListEventArgs<OrganizationalItemItemsFilter>>(OnListRequested, EventPhases.Processed);
        }

        /// <summary>
        /// Called whenever an item is marked as published (or unpublished) for a target. Updates the publish info data used by the extension.
        /// </summary>
        private static void OnPublishStateUpdated(IdentifiableObject subject, SetPublishStateEventArgs e, EventPhases phase)
        {
            var item = GetNonSharedItem(subject);

            // Deal with exceptions
            if (subject is VersionedItem versioned && versioned.IsCheckedOut)
            {
                // For checked-out items, we need to store the app data on both the latest and the dynamic version of the item - otherwise the data is lost.
                ApplicationDataManager.Save(item, e);
                ApplicationDataManager.Save(versioned.DynamicVersion, e);
                return;
            }

            // Store the application data on the published item
            ApplicationDataManager.Save(item, e);
        }

        /// <summary>
        /// Adds the publish status to the ExtensionProperties of an item when it is loaded (if applicable)
        /// </summary>
        private void OnItemLoaded(IdentifiableObject subject, LoadEventArgs e, EventPhases phase)
        {
            if (IsRelevantItem(subject))
            {
                var eventEntries = ApplicationDataManager.Load(subject);
                AddExtensionProperty(subject, eventEntries);
            }
        }

        /// <summary>
        /// Clears the publish info for newly copied items.
        /// </summary>
        private void OnItemCopied(IdentifiableObject subject, CopyEventArgs e, EventPhases phase)
        {
            if (IsRelevantItem(subject))
            {
                ApplicationDataManager.Delete(e.CopiedObject);
            }
        }

        /// <summary>
        /// Adds publish info to every relevant item in the list (as an extension property with JSON data)
        /// </summary>
        private static void OnListRequested(OrganizationalItem subject, GetListEventArgs<OrganizationalItemItemsFilter> e, EventPhases phase)
        {
            IDictionary<string, IEnumerable<PublishEventEntry>> allPublishInfo =
                ApplicationDataManager.BulkLoad(subject.Session, GetRelevantItemIds(e.ListItems));

            foreach (var listItem in e.ListItems)
            {
                if (allPublishInfo.TryGetValue(listItem.Id.ToString(), out IEnumerable<PublishEventEntry> eventEntry))
                {
                    AddExtensionProperty(listItem, eventEntry);
                }
            }
        }

        /// <summary>
        /// Adds the publish status to the ExtensionProperties collection for the given item.
        /// </summary>
        /// <param name="item">The item to add the info to.</param>
        /// <param name="eventEntry">The list of publish event entries to add.</param>
        private static void AddExtensionProperty(IdentifiableObject item, IEnumerable<PublishEventEntry> eventEntry)
        {
            item.ExtensionProperties.Add(ExtensionPropertyName,
                new ExtensionProperty(eventEntry, item.RevisionDate)
                .ConvertToJson());
        }

        /// <summary>
        /// Gets the item from the owning Publication instead, if the item is shared.
        /// </summary>
        private static IdentifiableObject GetNonSharedItem(IdentifiableObject subject)
        {
            if (subject is VersionedItem versioned && versioned.IsShared)
            {
                // It is not allowed to store app data on shared items...get the item from the owning Publication instead
                var uriInOwningPublication = new TcmUri(subject.Id.ItemId, subject.Id.ItemType, versioned.OwningRepository.Id.ItemId);
                return subject.Session.GetObject(uriInOwningPublication);
            }

            return subject;
        }

        /// <summary>
        /// Returns true if the item is one we wish to display publish status for.
        /// </summary>
        /// <param name="item">The item to check</param>
        /// <returns>true if the item should have its publish status shown in the list; false otherwise.</returns>
        private static bool IsRelevantItem(IdentifiableObject item)
            => item is Component || item is Page;

        /// <summary>
        /// Returns a subset of the given items, containing only items relevant for the extension.
        /// </summary>
        /// <param name="collection">The list of items to filter.</param>
        private static IEnumerable<IdentifiableObject> GetRelevantItems(IEnumerable<IdentifiableObject> collection)
            => collection.Where(IsRelevantItem);

        /// <summary>
        /// Returns the IDs of all relevant items in a given list.
        /// </summary>
        /// <param name="listItems">The list of items to filter.</param>
        private static IEnumerable<string> GetRelevantItemIds(IEnumerable<IdentifiableObject> listItems)
            => GetRelevantItems(listItems).Select(item => item.Id.ToString());
    }
}
