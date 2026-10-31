/**
 * IPL Teams Configuration Data
 * 10 Real IPL Franchises with starting purse ₹120.00 Crore
 */

export const INITIAL_PURSE_CRORES = 120.00;

export const TEAMS_DATA = [
  {
    id: 'mi',
    name: 'Mumbai Indians',
    shortName: 'MI',
    primaryColor: '#004BA0',
    secondaryColor: '#D1AB3E',
    accentColor: '#0077D9',
    badgeText: 'MI',
    trophies: 5,
    homeGround: 'Wankhede Stadium, Mumbai',
    description: '5-Time IPL Champions, famed for strong scouting & star-studded lineup.',
    logoSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%23004BA0" stroke="%23D1AB3E" stroke-width="6"/><path d="M50 20 L68 78 L50 64 L32 78 Z" fill="%23D1AB3E"/><text x="50" y="55" font-family="Arial,sans-serif" font-weight="900" font-size="22" fill="%23FFFFFF" text-anchor="middle">MI</text></svg>`
  },
  {
    id: 'csk',
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    primaryColor: '#FDB913',
    secondaryColor: '#005CA9',
    accentColor: '#F7D000',
    badgeText: 'CSK',
    trophies: 5,
    homeGround: 'M. A. Chidambaram Stadium, Chennai',
    description: '5-Time IPL Champions, renowned for tactical mastery and lionhearted spirit.',
    logoSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%23FDB913" stroke="%23005CA9" stroke-width="6"/><circle cx="50" cy="50" r="36" fill="%23005CA9"/><text x="50" y="58" font-family="Arial,sans-serif" font-weight="900" font-size="20" fill="%23FDB913" text-anchor="middle">CSK</text></svg>`
  },
  {
    id: 'rcb',
    name: 'Royal Challengers Bengaluru',
    shortName: 'RCB',
    primaryColor: '#EC1C24',
    secondaryColor: '#D2AB66',
    accentColor: '#1A1A1A',
    badgeText: 'RCB',
    trophies: 0,
    homeGround: 'M. Chinnaswamy Stadium, Bengaluru',
    description: 'High-octane crowd favorites with passionate global fan support & explosive firepower.',
    logoSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%231A1A1A" stroke="%23EC1C24" stroke-width="6"/><circle cx="50" cy="50" r="36" fill="%23EC1C24"/><text x="50" y="58" font-family="Arial,sans-serif" font-weight="900" font-size="20" fill="%23D2AB66" text-anchor="middle">RCB</text></svg>`
  },
  {
    id: 'kkr',
    name: 'Kolkata Knight Riders',
    shortName: 'KKR',
    primaryColor: '#3A225D',
    secondaryColor: '#C4A006',
    accentColor: '#6B43A1',
    badgeText: 'KKR',
    trophies: 3,
    homeGround: 'Eden Gardens, Kolkata',
    description: '3-Time IPL Champions, known for aggressive power-hitting and mystery spin.',
    logoSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%233A225D" stroke="%23C4A006" stroke-width="6"/><circle cx="50" cy="50" r="36" fill="%236B43A1"/><text x="50" y="58" font-family="Arial,sans-serif" font-weight="900" font-size="20" fill="%23C4A006" text-anchor="middle">KKR</text></svg>`
  },
  {
    id: 'srh',
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    primaryColor: '#F26522',
    secondaryColor: '#000000',
    accentColor: '#FF822A',
    badgeText: 'SRH',
    trophies: 1,
    homeGround: 'Rajiv Gandhi Intl Stadium, Hyderabad',
    description: '2016 Champions, record-breaking batting powerhouses in modern IPL cricket.',
    logoSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%23F26522" stroke="%23000000" stroke-width="6"/><circle cx="50" cy="50" r="36" fill="%23000000"/><text x="50" y="58" font-family="Arial,sans-serif" font-weight="900" font-size="20" fill="%23F26522" text-anchor="middle">SRH</text></svg>`
  },
  {
    id: 'rr',
    name: 'Rajasthan Royals',
    shortName: 'RR',
    primaryColor: '#EA1A85',
    secondaryColor: '#254AA5',
    accentColor: '#FF69B4',
    badgeText: 'RR',
    trophies: 1,
    homeGround: 'Sawai Mansingh Stadium, Jaipur',
    description: 'Inaugural 2008 champions, pioneering fearless young talent and data analytics.',
    logoSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%23EA1A85" stroke="%23254AA5" stroke-width="6"/><circle cx="50" cy="50" r="36" fill="%23254AA5"/><text x="50" y="58" font-family="Arial,sans-serif" font-weight="900" font-size="22" fill="%23FFFFFF" text-anchor="middle">RR</text></svg>`
  },
  {
    id: 'dc',
    name: 'Delhi Capitals',
    shortName: 'DC',
    primaryColor: '#004C97',
    secondaryColor: '#D71920',
    accentColor: '#2C82C9',
    badgeText: 'DC',
    trophies: 0,
    homeGround: 'Arun Jaitley Stadium, New Delhi',
    description: 'Dynamic capital squad fueled by young Indian core and fierce international pace.',
    logoSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%23004C97" stroke="%23D71920" stroke-width="6"/><circle cx="50" cy="50" r="36" fill="%23D71920"/><text x="50" y="58" font-family="Arial,sans-serif" font-weight="900" font-size="22" fill="%23FFFFFF" text-anchor="middle">DC</text></svg>`
  },
  {
    id: 'pbks',
    name: 'Punjab Kings',
    shortName: 'PBKS',
    primaryColor: '#ED1B24',
    secondaryColor: '#DCDDDF',
    accentColor: '#B2171E',
    badgeText: 'PBKS',
    trophies: 0,
    homeGround: 'PCA New Stadium, Mullanpur',
    description: 'Lions of the north, known for high-scoring thrills and spirited auction bidding.',
    logoSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%23ED1B24" stroke="%23DCDDDF" stroke-width="6"/><circle cx="50" cy="50" r="36" fill="%23B2171E"/><text x="50" y="58" font-family="Arial,sans-serif" font-weight="900" font-size="18" fill="%23FFFFFF" text-anchor="middle">PBKS</text></svg>`
  },
  {
    id: 'gt',
    name: 'Gujarat Titans',
    shortName: 'GT',
    primaryColor: '#1B2133',
    secondaryColor: '#DDB339',
    accentColor: '#2E3958',
    badgeText: 'GT',
    trophies: 1,
    homeGround: 'Narendra Modi Stadium, Ahmedabad',
    description: '2022 Champions in debut season, masters of team cohesion and clutch finishes.',
    logoSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%231B2133" stroke="%23DDB339" stroke-width="6"/><circle cx="50" cy="50" r="36" fill="%232E3958"/><text x="50" y="58" font-family="Arial,sans-serif" font-weight="900" font-size="22" fill="%23DDB339" text-anchor="middle">GT</text></svg>`
  },
  {
    id: 'lsg',
    name: 'Lucknow Super Giants',
    shortName: 'LSG',
    primaryColor: '#0057B8',
    secondaryColor: '#F77F00',
    accentColor: '#00A896',
    badgeText: 'LSG',
    trophies: 0,
    homeGround: 'BRSABV Ekana Stadium, Lucknow',
    description: 'Consistent playoff contenders with aggressive top order and all-round depth.',
    logoSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%230057B8" stroke="%23F77F00" stroke-width="6"/><circle cx="50" cy="50" r="36" fill="%2300A896"/><text x="50" y="58" font-family="Arial,sans-serif" font-weight="900" font-size="20" fill="%23FFFFFF" text-anchor="middle">LSG</text></svg>`
  }
];
