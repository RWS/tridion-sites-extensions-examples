using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Example.PublishStatus
{
    /// <summary>
    /// Represents the Extension Property for an item, which contains the Publish Status for each Target Type it has been published to.
    /// </summary>
    internal class ExtensionProperty
    {
        private readonly IEnumerable<PublishInfo> _entries;

        public ExtensionProperty(IEnumerable<PublishEventEntry> entries, DateTime itemRevisionDate)
        {
            _entries = entries.Select(info => new PublishInfo(info, itemRevisionDate));
        }

        public string ConvertToJson() => JsonConvert.SerializeObject(_entries.ToArray());
    }
}
