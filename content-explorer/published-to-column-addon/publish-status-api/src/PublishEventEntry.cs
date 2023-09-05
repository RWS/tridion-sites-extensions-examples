using System;
using Tridion.ContentManager.Extensibility.Events;

namespace Example.PublishStatus
{
    /// <summary>
    /// Contains information about the last time an item was published to a given Target Type.
    /// </summary>
    public class PublishEventEntry
    {
        /// <summary>
        /// The ID of the Target Type that the item was published to.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// The name of the Target Type that the item was published to.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// The name of the user who published the item.
        /// </summary>
        public string User { get; set; }

        /// <summary>
        /// The date and time that the item was published to the target.
        /// </summary>
        public DateTime Date { get; set; }

        public PublishEventEntry()
        {
        }

        public PublishEventEntry(SetPublishStateEventArgs eventArgs, DateTime date)
        {
            Id = eventArgs.TargetType.Id;
            Title = eventArgs.TargetType.Title;
            User = eventArgs.Publisher.Title;
            Date = date;
        }
    }
}
