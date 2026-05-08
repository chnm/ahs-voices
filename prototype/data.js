// Shared sample data for the AHS Oral History theme prototypes.
// All three directions share this so you can compare like-for-like.

window.AHS_DATA = (function () {
  const collections = [
    { id: 'patriots', title: "Patriots' Day & the Battle Road", count: 14, blurb: "Recollections of the Battles of Lexington and Concord, the Jason Russell House skirmish, and how Arlington commemorates them.", years: "1775–present" },
    { id: 'menotomy', title: 'Menotomy Voices', count: 22, blurb: "Long-time residents reflect on growing up in Arlington — neighborhoods, schools, the Mystic Lakes, the bus to Boston.", years: '1920s–1990s' },
    { id: 'mainstreet', title: 'Mass Ave Main Street', count: 11, blurb: 'Shopkeepers, diner cooks, and pharmacists describe the changing face of Massachusetts Avenue.', years: '1940s–2010s' },
    { id: 'immigrant', title: 'Coming to Arlington', count: 18, blurb: 'Italian, Irish, Armenian, Greek, and Chinese-American families describe arrival, work, and community.', years: '1900s–2020s' },
    { id: 'civic', title: 'Town Meeting & Civic Life', count: 9, blurb: 'Selectmen, librarians, school committee members, and volunteers on Arlington governance.', years: '1960s–2020s' },
    { id: 'mills', title: 'The Mills on the Mystic', count: 7, blurb: "Industry along Mill Brook — from Schwamb's mirrors to the ice houses of Spy Pond.", years: '1850s–1950s' }
  ];

  const interviews = [
    { id: 'russell-eleanor', name: 'Eleanor Russell', years: '1918–2014', recorded: 'June 14, 2008', length: '1:42:18', collection: 'patriots', topics: ['Jason Russell House', 'Patriots\' Day', 'Genealogy'], neighborhood: 'Arlington Center', interviewer: 'Margaret Chen', summary: "A descendant of Jason Russell recounts family stories passed down about April 19, 1775, and her decades caring for the Russell House as a docent.", featured: true },
    { id: 'caruso-anthony', name: 'Anthony Caruso', years: 'b. 1936', recorded: 'March 3, 2019', length: '2:11:04', collection: 'mainstreet', topics: ['Mass Ave', 'Italian-American', 'Bakery'], neighborhood: 'East Arlington', interviewer: 'Sarah Whitford', summary: "Owner of Caruso's Bakery on Mass Ave from 1962 to 2004 describes apprenticing with his father and watching the avenue change." },
    { id: 'okonjo-grace', name: 'Grace Okonjo', years: 'b. 1954', recorded: 'October 22, 2021', length: '1:18:47', collection: 'civic', topics: ['Town Meeting', 'School Committee', 'Civil Rights'], neighborhood: 'Arlington Heights', interviewer: 'David Park', summary: 'The first African-American woman elected to Arlington Town Meeting reflects on civic life from the 1980s onward.' },
    { id: 'donovan-patrick', name: 'Patrick Donovan', years: '1929–2020', recorded: 'August 9, 2011', length: '2:48:33', collection: 'menotomy', topics: ['Spy Pond', 'Ice harvesting', 'Childhood'], neighborhood: 'East Arlington', interviewer: 'Margaret Chen', summary: 'Recollections of the last commercial ice cuttings on Spy Pond and growing up by the Mystic Lakes.' },
    { id: 'aram-vartan', name: 'Vartan Aramian', years: 'b. 1947', recorded: 'May 2, 2017', length: '1:55:09', collection: 'immigrant', topics: ['Armenian community', 'Watertown', 'Rugs'], neighborhood: 'Brattle Street', interviewer: 'Lila Hovsepian', summary: 'Arrival from Beirut in 1972 and the Armenian community connecting Watertown and Arlington.' },
    { id: 'schwamb-ruth', years: '1924–2018', name: 'Ruth Schwamb', recorded: 'July 19, 2010', length: '1:12:55', collection: 'mills', topics: ['Schwamb Mill', 'Industry', 'Mill Brook'], neighborhood: 'Arlington Heights', interviewer: 'Margaret Chen', summary: "A Schwamb family member describes the picture-frame mill\u2019s last working days and the decision to make it a museum." },
    { id: 'lee-helen', name: 'Helen Lee', years: 'b. 1962', recorded: 'February 11, 2023', length: '1:34:21', collection: 'immigrant', topics: ['Chinese-American', 'Restaurants', 'School'], neighborhood: 'Arlington Center', interviewer: 'David Park', summary: 'A second-generation Chinese-American restaurateur on family, food, and Arlington High School.' },
    { id: 'mcgrath-jim', name: 'James McGrath', years: 'b. 1941', recorded: 'November 4, 2015', length: '2:02:11', collection: 'menotomy', topics: ['Buses', 'Boston', 'Mystic Lakes'], neighborhood: 'Arlington Heights', interviewer: 'Sarah Whitford', summary: 'A retired MBTA driver remembers the 77 bus route and weekends at the Mystic Lakes.' }
  ];

  // Synced transcript for the featured interview (Eleanor Russell).
  // Each segment has a start time in seconds and the spoken text.
  const transcript = [
    { t: 0, speaker: 'INTERVIEWER', text: "Today is June 14, 2008. I'm sitting with Eleanor Russell at her home on Jason Street. Eleanor, thank you for having me." },
    { t: 12, speaker: 'RUSSELL', text: "Oh, you're very welcome, dear. I've been waiting all week. I made a list — though I'm sure I'll forget half of it." },
    { t: 24, speaker: 'INTERVIEWER', text: "Let's start with the house. When did you first understand that the Jason Russell House was — your house?" },
    { t: 36, speaker: 'RUSSELL', text: "I always knew, in a way. My father would point at it on our Sunday walks and say, that's where Grandfather Jason was killed. He'd say it just like that, very plain. I was maybe four." },
    { t: 64, speaker: 'RUSSELL', text: "But I think the day it really landed was the bicentennial in 1925 — the 150th anniversary of the battle. There was a re-enactment, and somebody handed me a flag, and I remember thinking, oh, this is mine. This belongs to me. The whole story." },
    { t: 98, speaker: 'INTERVIEWER', text: "What did your father tell you about April 19, 1775?" },
    { t: 108, speaker: 'RUSSELL', text: "He told it the way his father told it. Jason was fifty-eight. He had a bad leg from an accident. He should not have been fighting at all. But the alarm came down from Lexington — the regulars were coming back through Menotomy — and Jason said, an Englishman's home is his castle, and he wouldn't leave." },
    { t: 152, speaker: 'RUSSELL', text: "There were minutemen from neighboring towns who tried to ambush the column from behind the house. The British flanking party came up Jason Street and caught them. Jason was shot on his own doorstep. There were eleven men killed in or around the house that afternoon." },
    { t: 198, speaker: 'INTERVIEWER', text: "The bullet holes — they're still in the walls?" },
    { t: 206, speaker: 'RUSSELL', text: "Some of them. The Society has been very careful. When I started as a docent in 1962, you could put your finger in one of them. We don't allow that anymore, of course." },
    { t: 232, speaker: 'RUSSELL', text: "I gave my first tour in a yellow dress. I was so nervous I forgot the date of the battle. A boy of about ten corrected me. April nineteenth, ma'am, he said, very serious. I never forgot it again." },
    { t: 268, speaker: 'INTERVIEWER', text: "What changed about how the Society told the story, over the years?" },
    { t: 280, speaker: 'RUSSELL', text: "Oh, everything. When I started, it was all about Jason and the minutemen — the heroes. Then in the seventies people wanted to know about the women in the house — Elizabeth, Jason's wife, hiding in the cellar with the children. Then about the enslaved people the Russell family had owned, which was a hard conversation." },
    { t: 332, speaker: 'RUSSELL', text: "And it should be hard. History should be hard sometimes. The house holds all of it." }
  ];

  return { collections, interviews, transcript };
})();
