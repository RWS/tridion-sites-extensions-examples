using System;

namespace Example.PublishStatus
{
    /// <summary>
    /// Contains information about the last time an item was published to a given Target Type and whether the item has been updated since that time.
    /// </summary>
    internal class PublishInfo : PublishEventEntry
    {
        /// <summary>
        /// If false, the item has been updated since it was last published to this target.
        /// </summary>
        public bool UpToDate { get; }

        public PublishInfo(PublishEventEntry original, DateTime itemRevisionDate)
        {
            Id = original.Id;
            Title = original.Title;
            User = original.User;
            Date = original.Date;
            UpToDate = itemRevisionDate <= Date;
        }
    }
}
