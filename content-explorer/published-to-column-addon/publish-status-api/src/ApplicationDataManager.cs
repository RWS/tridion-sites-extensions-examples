using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using Tridion.ContentManager;
using Tridion.ContentManager.Extensibility.Events;

namespace Example.PublishStatus
{
    /// <summary>
    /// Handles the storage of the application data needed to display the publish status.
    /// </summary>
    internal static class ApplicationDataManager
    {
        public const string ApplicationId = "Example.PublishStatus";

        /// <summary>
        /// Remove the publish status application data for the given item.
        /// </summary>
        /// <param name="item">The item to remove the data from.</param>
        public static void Delete(IdentifiableObject item)
        {
            item.DeleteApplicationData(ApplicationId);
        }

        /// <summary>
        /// Save the publish status application data for the given item.
        /// </summary>
        /// <param name="item">The item to save the data on.</param>
        /// <param name="e">The arguments passed to the SetPublishState event, when it was raised.</param>
        public static void Save(IdentifiableObject item, SetPublishStateEventArgs e)
        {
            var publishInfo = UpdatePublishEntries(item, e);
            var adapter = new ApplicationDataAdapter(ApplicationId, ConvertToJson(publishInfo));
            item.SaveApplicationData(adapter.ApplicationData);
        }

        /// <summary>
        /// Loads the publish status application data for the given item.
        /// </summary>
        /// <param name="item">The item to load the data for.</param>
        public static IEnumerable<PublishEventEntry> Load(IdentifiableObject item)
        {
            var applicationData = item.LoadApplicationData(ApplicationId);
            return ConvertFromApplicationData(applicationData);
        }

        /// <summary>
        /// Loads the publish status application data for multiple items in one go.
        /// </summary>
        /// <param name="session">The session to use for the operations (e.g. subject.Session)</param>
        /// <param name="itemIds">A list of item URIs (as strings) of the items to load the data for.</param>
        /// <returns></returns>
        public static IDictionary<string, IEnumerable<PublishEventEntry>> BulkLoad(Session session, IEnumerable<string> itemIds)
        {
            IDictionary<string, IEnumerable<ApplicationData>> applicationData = session.SystemManager.LoadApplicationDataForSubjects(
                itemIds,
                new[] { ApplicationId }
            );

            return applicationData.ToDictionary(entry => entry.Key, entry => ConvertFromApplicationData(entry.Value.FirstOrDefault()));
        }

        /// <summary>
        /// Updates the appropriate publish status entries for the event that was triggered.
        /// </summary>
        private static PublishEventEntry[] UpdatePublishEntries(IdentifiableObject item, SetPublishStateEventArgs e)
        {
            // Filter out any existing entries for the Target Type
            var publishEntries = ConvertFromApplicationData(item.LoadApplicationData(ApplicationId))
                .Where(entry => !string.Equals(entry.Id, e.TargetType.Id))
                .ToList();

            if (e.IsPublished)
            {
                publishEntries.Add(new PublishEventEntry(e, DateTime.UtcNow));
            }

            return publishEntries.ToArray();
        }

        /// <summary>
        /// Converts the given application data to a list of PublishEventEntry.
        /// </summary>
        /// <param name="applicationData">The application data to convert.</param>
        private static IEnumerable<PublishEventEntry> ConvertFromApplicationData(ApplicationData applicationData)
        {
            if (applicationData != null)
            {
                var adapter = new ApplicationDataAdapter(applicationData);
                if (adapter.TryGetAs<string>(out var json))
                {
                    return ConvertFromJson(json);
                }
            }
            return Array.Empty<PublishEventEntry>();
        }

        /// <summary>
        /// Converts an array of PublishEventEntry to JSON.
        /// </summary>
        /// <param name="publishInfo">The entries to convert.</param>
        private static string ConvertToJson(PublishEventEntry[] publishInfo)
        {
            return JsonConvert.SerializeObject(publishInfo);
        }

        /// <summary>
        /// Converts a JSON representation to an array of PublishEventEntry.
        /// </summary>
        /// <param name="json">The JSON representation of the entries.</param>
        private static PublishEventEntry[] ConvertFromJson(string json)
        {
            return JsonConvert.DeserializeObject<PublishEventEntry[]>(json);
        }
    }
}
