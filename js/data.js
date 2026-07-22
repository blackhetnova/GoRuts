// Complete Surat BRTS Stops List (153+ stations)
const busStops = [
  "Aai Mata Chowk BRTS", "Abhishek Township BRTS", "Adajan Gam BRTS", "Adajan G.S.R.T.C. BRTS", "Adajan Patiya BRTS", "Airport Circle BRTS", "Althan Depot Terminal BRTS", "Amazia Amusement Park BRTS", "Amroli Char Rasta BRTS", "Anuvrat Dwar BRTS",
  "Athwa Gate BRTS", "Bardoli BRTS", "Bhestan BRTS", "Bhimrad Canal Road BRTS", "Canal Road BRTS", "City Center BRTS", "Daksheshwar Mahadev Junction BRTS", "Dindoli Varigruh BRTS", "Dumas BRTS", "Faram BRTS",
  "Gajera Circle BRTS", "Ghod Dod Road BRTS", "Hirabaug BRTS", "Honey Park BRTS", "Icchapore BRTS", "Jahangirpura BRTS", "Jahangirpura Community Hall BRTS", "Kadodara BRTS", "Kamrej BRTS", "Katargam BRTS",
  "Katargam Darwaja BRTS", "Kharwarnagar BRTS", "Khajod Gam BRTS", "Khatodara BRTS", "Kosad BRTS", "Kosad Depot BRTS", "Kosad EWS H2 BRTS", "Kosad Gam BRTS", "Lal Darwaja BRTS", "Lake Garden BRTS",
  "Majura Gate BRTS", "Makkai Pool BRTS", "Mini Bazaar BRTS", "Mora Char Rasta BRTS", "Mota Varachha BRTS", "Nana Varachha BRTS", "Navsari BRTS", "ONGC Colony BRTS", "Pal R.T.O. BRTS", "Palanpur Gam BRTS",
  "Pandesara BRTS", "Piplod BRTS", "Puna Canal BRTS", "Puna Patiya BRTS", "Railway Station BRTS", "Rander Gam BRTS", "Ring Road BRTS", "Rupali Junction BRTS", "Sachin G.I.D.C. BRTS", "Sachin Gam BRTS",
  "Sarthana BRTS", "Sarthana Jakat Naka BRTS", "Sarthana Nature Park BRTS", "Sayan BRTS", "SGM College Bhesan BRTS", "SIECC Road BRTS", "Simada Junction BRTS", "St. Thomas School Junction BRTS", "Surat Airport BRTS", "Textile Market BRTS",
  "Udhana BRTS", "Udhana Darwaja BRTS", "Udhana Magdalla Road BRTS", "Unn BRTS", "Unn Industrial Estate BRTS", "Utran ROB Bridge BRTS", "Varachha BRTS", "Variav Gam BRTS", "Ved Road BRTS", "Vesu Gaam BRTS",
  "Vesu VIP Road BRTS", "V.I.P. Road BRTS", "V.N.S.G.U. BRTS", "Vrukshlaxmi Society BRTS", "Y Junction Dumas Road BRTS", "Y Junction Udhana Magdalla Road BRTS", "Yogi Chowk BRTS", "Abhva Gam BRTS", "Airport BRTS", "Althan BRTS",
  "Amroli BRTS", "Anand Mahal Road BRTS", "Athwalines BRTS", "Bamroli BRTS", "Bhestan Garden BRTS", "Bhimrad BRTS", "Chiku Wadi BRTS", "Chowk BRTS",
  "City Light Road BRTS", "Dindoli BRTS", "Dumas Beach BRTS", "G.I.D.C. Sachin BRTS", "Gajera School BRTS", "Gopi Talav BRTS", "Green City Road BRTS", "Hirabaug Circle BRTS", "Jawaharlal Nehru Garden BRTS", "Kadodara Highway BRTS",
  "Kapodara BRTS", "Karanj BRTS", "Katar Gam BRTS", "Khajod BRTS", "Kharwarnagar Road BRTS", "Kosad Road BRTS", "Laxmidham Society BRTS", "Magdalla BRTS", "Majura Gate Circle BRTS", "Mini Bazar BRTS",
  "Mota Varachha Road BRTS", "Nana Varachha Road BRTS", "Navsari Highway BRTS", "New Civil Hospital BRTS", "Nirmal Hospital BRTS", "Paland BRTS", "Pandesara GIDC BRTS", "Parvat Gam BRTS", "Pipodara BRTS", "Puna Gam BRTS",
  "Rander Road BRTS", "Rander Talav BRTS", "Rangila Tower BRTS", "Sachin BRTS", "Sachin Depot BRTS", "Sachin GIDC Junction BRTS", "Sahara Darwaja BRTS", "Sarthana Depot BRTS", "Sayan Road BRTS", "SG Highway BRTS",
  "Shivaji Road BRTS", "Siddharth Nagar BRTS", "Simada BRTS", "Sindhi Market BRTS", "SMC Office BRTS", "Soni Falia BRTS", "Stadium Road BRTS", "Subhash Nagar BRTS", "Sumul Dairy Road BRTS", "Surya Kiran Road BRTS",
  "Tapi River Front BRTS", "Trikam Nagar BRTS", "Udhana Academy Road BRTS", "Udhana Darwaja Circle BRTS", "Udhana Main Road BRTS", "Udhana Sachin Road BRTS", "Utran BRTS", "Vadod BRTS", "Vadodara Road BRTS", "Vadodara-Surat Highway BRTS",
  "Varachha Road BRTS", "Ved Road Gam BRTS", "Vesu Canal Road BRTS", "Vesu Main Road BRTS", "Vesu VIP Road Gail Colony BRTS", "V.I.P. Road Circle BRTS", "Vivekanand College BRTS", "Yogi Chowk Road BRTS"
];

// Route mappings for BRTS stops
const routeMap = {
  "Aai Mata Chowk BRTS": ["11", "12", "13"], "Abhishek Township BRTS": ["14", "15"], "Adajan Gam BRTS": ["1", "2", "3", "4"], "Adajan G.S.R.T.C. BRTS": ["1", "2"], "Adajan Patiya BRTS": ["3", "4", "21"], "Airport Circle BRTS": ["136", "11"], "Althan Depot Terminal BRTS": ["15AA", "15CC", "21"], "Amazia Amusement Park BRTS": ["15AA", "15CC", "403", "504"], "Amroli Char Rasta BRTS": ["4", "5"], "Anuvrat Dwar BRTS": ["6"],
  "Athwa Gate BRTS": ["7", "8", "9"], "Bardoli BRTS": ["11", "15"], "Bhestan BRTS": ["1", "10", "315"], "Bhimrad Canal Road BRTS": ["116B", "11"], "Canal Road BRTS": ["12", "14", "22"], "City Center BRTS": ["1", "3", "7", "9"], "Daksheshwar Mahadev Junction BRTS": ["7"], "Dindoli Varigruh BRTS": ["16", "8"], "Dumas BRTS": ["206", "216"], "Faram BRTS": ["6", "1"],
  "Gajera Circle BRTS": ["10", "8"], "Ghod Dod Road BRTS": ["7", "8", "9"], "Hirabaug BRTS": ["8", "9"], "Honey Park BRTS": ["8", "3"], "Icchapore BRTS": ["7", "2"], "Jahangirpura BRTS": ["13", "21", "706"], "Jahangirpura Community Hall BRTS": ["13"], "Kadodara BRTS": ["13", "19", "109"], "Kamrej BRTS": ["17", "17E"], "Katargam BRTS": ["2", "4", "6"],
  "Katargam Darwaja BRTS": ["11"], "Kharwarnagar BRTS": ["20", "305"], "Khajod Gam BRTS": ["116A", "116B"], "Khatodara BRTS": ["2", "4"], "Kosad BRTS": ["6", "1", "14"], "Kosad Depot BRTS": ["16"], "Kosad EWS H2 BRTS": ["14", "20", "22"], "Kosad Gam BRTS": ["212", "226"], "Lal Darwaja BRTS": ["1", "6", "7", "8"], "Lake Garden BRTS": ["9"],
  "Majura Gate BRTS": ["2", "3", "9"], "Makkai Pool BRTS": ["217"], "Mini Bazaar BRTS": ["410"], "Mora Char Rasta BRTS": ["658"], "Mota Varachha BRTS": ["7", "2", "103", "410"], "Nana Varachha BRTS": ["12U", "17AU", "3", "5"], "Navsari BRTS": ["5", "10"], "ONGC Colony BRTS": ["12", "14", "5"], "Pal R.T.O. BRTS": ["17", "4", "5"], "Palanpur Gam BRTS": ["117"],
  "Pandesara BRTS": ["3", "8", "105"], "Piplod BRTS": ["3", "8", "1"], "Puna Canal BRTS": ["402"], "Puna Patiya BRTS": ["1"], "Railway Station BRTS": ["1", "2", "3", "4", "5", "18", "102", "103", "104", "105", "106", "107", "109", "112", "116A", "116B", "117", "118", "126", "127", "136", "137"], "Rander Gam BRTS": ["127"], "Ring Road BRTS": ["4", "5", "6"], "Rupali Junction BRTS": ["11", "14"], "Sachin G.I.D.C. BRTS": ["11", "17E"],
  "Sachin Gam BRTS": ["S-Connect"], "Sarthana BRTS": ["5", "10"], "Sarthana Jakat Naka BRTS": ["12", "22"], "Sarthana Nature Park BRTS": ["12", "22", "403"], "Sayan BRTS": ["118"], "SGM College Bhesan BRTS": ["217"], "SIECC Road BRTS": ["116A"], "Simada Junction BRTS": ["12U", "17AU"], "St. Thomas School Junction BRTS": ["6", "7"], "Surat Airport BRTS": ["136", "4"], "Textile Market BRTS": ["4", "9"],
  "Udhana BRTS": ["1", "2", "5", "8", "11"], "Udhana Darwaja BRTS": ["11", "1"], "Udhana Magdalla Road BRTS": ["12", "13"], "Unn BRTS": ["205"], "Unn Industrial Estate BRTS": ["305"], "Utran ROB Bridge BRTS": ["18"], "Varachha BRTS": ["3", "5", "10"], "Variav Gam BRTS": ["137"], "Ved Road BRTS": ["9", "4"], "Vesu Gaam BRTS": ["506"], "Vesu VIP Road BRTS": ["506", "716"],
  "V.I.P. Road BRTS": ["10", "5"], "V.N.S.G.U. BRTS": ["126", "226"], "Vrukshlaxmi Society BRTS": ["104", "209"], "Y Junction Dumas Road BRTS": ["11", "13"], "Y Junction Udhana Magdalla Road BRTS": ["12", "13"], "Yogi Chowk BRTS": ["9", "4"], "Abhva Gam BRTS": ["106"], "Airport BRTS": ["136"], "Althan BRTS": ["21"],
  "Amroli BRTS": ["4"], "Anand Mahal Road BRTS": ["2"], "Athwalines BRTS": ["7"], "Bamroli BRTS": ["5"], "Bhestan Garden BRTS": ["315", "504"], "Bhimrad BRTS": ["116B"], "Chiku Wadi BRTS": ["105"], "Chowk BRTS": ["202", "204", "205", "206", "207", "209", "212", "216", "217"],
  "City Light Road BRTS": ["3"], "Dindoli BRTS": ["8", "3"], "Dumas Beach BRTS": ["216"], "G.I.D.C. Sachin BRTS": ["11"], "Gajera School BRTS": ["10"], "Gopi Talav BRTS": ["153"], "Green City Road BRTS": ["5"], "Hirabaug Circle BRTS": ["8"], "Jawaharlal Nehru Garden BRTS": ["7"], "Kadodara Highway BRTS": ["13"],
  "Kapodara BRTS": ["153"], "Karanj BRTS": ["1"], "Katar Gam BRTS": ["2"], "Khajod BRTS": ["116A", "116B"], "Kharwarnagar Road BRTS": ["20"], "Kosad Road BRTS": ["16"], "Laxmidham Society BRTS": ["202"], "Magdalla BRTS": ["13"], "Majura Gate Circle BRTS": ["2", "3"], "Mini Bazar BRTS": ["410"],
  "Mota Varachha Road BRTS": ["103", "410"], "Nana Varachha Road BRTS": ["3", "5"], "Navsari Highway BRTS": ["5"], "New Civil Hospital BRTS": ["7"], "Nirmal Hospital BRTS": ["8"], "Paland BRTS": ["4"], "Pandesara GIDC BRTS": ["105"], "Parvat Gam BRTS": ["6"], "Pipodara BRTS": ["1"], "Puna Gam BRTS": ["402"],
  "Rander Road BRTS": ["127"], "Rander Talav BRTS": ["127"], "Rangila Tower BRTS": ["3"], "Sachin BRTS": ["11", "17E"], "Sachin Depot BRTS": ["11"], "Sachin GIDC Junction BRTS": ["11"], "Sahara Darwaja BRTS": ["1"], "Sarthana Depot BRTS": ["12"], "Sayan Road BRTS": ["118"], "SG Highway BRTS": ["4"],
  "Shivaji Road BRTS": ["1"], "Siddharth Nagar BRTS": ["5"], "Simada BRTS": ["12U", "17AU"], "Sindhi Market BRTS": ["1"], "SMC Office BRTS": ["1"], "Soni Falia BRTS": ["2"], "Stadium Road BRTS": ["7"], "Subhash Nagar BRTS": ["5"], "Sumul Dairy Road BRTS": ["4"], "Surya Kiran Road BRTS": ["3"],
  "Tapi River Front BRTS": ["206"], "Trikam Nagar BRTS": ["5"], "Udhana Academy Road BRTS": ["11"], "Udhana Darwaja Circle BRTS": ["11"], "Udhana Main Road BRTS": ["11"], "Udhana Sachin Road BRTS": ["11"], "Utran BRTS": ["18"], "Vadod BRTS": ["4"], "Vadodara Road BRTS": ["4"], "Vadodara-Surat Highway BRTS": ["4"],
  "Varachha Road BRTS": ["3", "5"], "Ved Road Gam BRTS": ["9"], "Vesu Canal Road BRTS": ["506"], "Vesu Main Road BRTS": ["506"], "Vesu VIP Road Gail Colony BRTS": ["716"], "V.I.P. Road Circle BRTS": ["10"], "Vivekanand College BRTS": ["107"], "Yogi Chowk Road BRTS": ["9"]
};

// SVG Node positions for selected stations in the SVG map
const mapStationCoordinates = {
  "Jahangirpura BRTS": { x: 60, y: 60 },
  "Sarthana BRTS": { x: 390, y: 60 },
  "Sayan BRTS": { x: 390, y: 120 },
  "Adajan Gam BRTS": { x: 60, y: 130 },
  "Katargam BRTS": { x: 320, y: 140 },
  "Rander Gam BRTS": { x: 60, y: 200 },
  "Majura Gate BRTS": { x: 170, y: 200 },
  "Railway Station BRTS": { x: 250, y: 200 },
  "Simada Junction BRTS": { x: 390, y: 190 },
  "Lal Darwaja BRTS": { x: 250, y: 260 },
  "Varachha BRTS": { x: 390, y: 260 },
  "Athwa Gate BRTS": { x: 170, y: 330 },
  "Textile Market BRTS": { x: 250, y: 330 },
  "Yogi Chowk BRTS": { x: 390, y: 330 },
  "Dumas BRTS": { x: 60, y: 400 },
  "Vesu Gaam BRTS": { x: 110, y: 400 },
  "Piplod BRTS": { x: 170, y: 400 },
  "City Center BRTS": { x: 250, y: 400 },
  "Katargam Darwaja BRTS": { x: 320, y: 400 },
  "Ring Road BRTS": { x: 390, y: 400 },
  "V.I.P. Road BRTS": { x: 170, y: 470 },
  "Ghod Dod Road BRTS": { x: 250, y: 470 },
  "Ved Road BRTS": { x: 390, y: 470 },
  "Surat Airport BRTS": { x: 60, y: 540 },
  "Althan BRTS": { x: 110, y: 540 },
  "Udhana BRTS": { x: 250, y: 540 },
  "Kosad BRTS": { x: 320, y: 540 },
  "Pandesara BRTS": { x: 390, y: 540 },
  "Bhimrad BRTS": { x: 110, y: 620 },
  "Bhestan BRTS": { x: 250, y: 620 },
  "Sachin G.I.D.C. BRTS": { x: 390, y: 620 },
  "Althan Depot Terminal BRTS": { x: 110, y: 680 },
  "Udhana Darwaja BRTS": { x: 250, y: 680 },
  "Sachin Gam BRTS": { x: 390, y: 680 }
};

// Notification alerts feed
const notificationsFeed = [
  { 
    id: 1, 
    hasIcon: true,
    time: '17 Jul 2026, 10:54 AM',
    text: 'Ticket booking is now available on the Sitilink Mobile App. Book your journey quickly and conveniently. Happy Journey! 🚌' 
  },
  { 
    id: 2, 
    hasIcon: false,
    time: '15 Jul 2026, 03:10 PM',
    text: '📢 મહત્વપૂર્ણ સૂચના (તા. 16/07/2026)<br><br>ભગવાન શ્રી જગન્નાથજીની રથયાત્રાને અનુલક્ષીને ટ્રાફિક પોલીસ વિભાગના સૂચનાનુસાર તા. 16/07/2026ના રોજ સવારે 06:00 વાગ્યાથી કાર્યક્રમ પૂર્ણ થાય ત્યાં સુધી BRTS તથા City Bus સેવાના અનેક રૂટોમાં ફેરફાર કરવામાં આવ્યો છે.<br><br>🚌 BRTS રૂટ<br>❌ બંધ:13, 14, 17A, 18, 20, 21, 22<br><br>🔀 ડાયવર્ટ:23<br><br>↔ ટૂંકાવેલ:11, 15AA, 15CC, 16, 19<br><br>🚌 City Bus રૂટ<br>❌ બંધ રૂટ:1, 2, 105, 106R, 106S, 107J, 107JP, 112, 116BR, 116R, 126R, 127J, 137J, 146, 153R, 204, 205G, 205H,'
  }
];

// Languages translations
const langText = {
  en: {
    valid: "VALID TICKET",
    validDesc: "Scan at the smart entry gate & enjoy your ride",
    suman: "SUMAN PRAVAS PASS",
    sumanDesc: "Unlimited travel on all BRTS routes until 10:00 PM",
    expired: "EXPIRED PASS",
    expiredDesc: "This ticket has expired. Please buy a new ticket.",
    fromLabel: "From / Boarding",
    toLabel: "To / Destination",
    selectSrc: "Select Source",
    selectDst: "Select Destination",
    paxCat: "Adult (General)",
    paxQty: "1 Ticket"
  },
  gu: {
    valid: "માન્ય ટિકિટ",
    validDesc: "સ્માર્ટ એન્ટ્રી ગેટ પર સ્કેન કરો અને તમારી મુસાફરીનો આનંદ માણો",
    suman: "સુમન પ્રવાસ પાસ",
    sumanDesc: "રાત્રે ૧૦:૦૦ વાગ્યા સુધી તમામ BRTS રૂટ પર અમર્યાદિત મુસાફરી",
    expired: "સમાપ્ત થયેલ ટિકિટ",
    expiredDesc: "આ ટિકિટની સમયસીમા સમાપ્ત થઈ ગઈ છે. કૃપા કરીને નવી ટિકિટ ખરીદો.",
    fromLabel: "ક્યાંથી ઉપડવું",
    toLabel: "ક્યાં જવું",
    selectSrc: "ઉદ્ગમ સ્ટેશન પસંદ કરો",
    selectDst: "ગંતવ્ય સ્ટેશન પસંદ કરો",
    paxCat: "પુખ્ત વયના (સામાન્ય)",
    paxQty: "૧ ટિકિટ"
  }
};

// Geographic Lat/Lng positions for Surat BRTS Stations
const stationGeoCoordinates = {
  "Railway Station BRTS": [21.2052, 72.8406],
  "Lal Darwaja BRTS": [21.2023, 72.8322],
  "Textile Market BRTS": [21.1895, 72.8465],
  "Udhana BRTS": [21.1680, 72.8420],
  "Bhestan BRTS": [21.1340, 72.8450],
  "Sachin G.I.D.C. BRTS": [21.0820, 72.8590],
  "Adajan Gam BRTS": [21.1960, 72.7930],
  "Jahangirpura BRTS": [21.2320, 72.7840],
  "Sayan BRTS": [21.3200, 72.8800],
  "Sarthana BRTS": [21.2320, 72.9050],
  "Simada Junction BRTS": [21.2180, 72.8850],
  "Varachha BRTS": [21.2100, 72.8650],
  "Yogi Chowk BRTS": [21.2120, 72.8950],
  "Surat Airport BRTS": [21.1140, 72.7420],
  "Dumas BRTS": [21.0800, 72.7090],
  "Vesu Gaam BRTS": [21.1390, 72.7750],
  "Piplod BRTS": [21.1600, 72.7830],
  "Athwa Gate BRTS": [21.1780, 72.8120],
  "Majura Gate BRTS": [21.1820, 72.8220],
  "Ghod Dod Road BRTS": [21.1680, 72.8120],
  "V.I.P. Road BRTS": [21.1480, 72.7950],
  "Althan BRTS": [21.1520, 72.8150],
  "Bhimrad BRTS": [21.1350, 72.8050],
  "Katargam BRTS": [21.2250, 72.8350],
  "Rander Gam BRTS": [21.2100, 72.7980],
  "Pandesara BRTS": [21.1450, 72.8420],
  "Ring Road BRTS": [21.1890, 72.8350],
  "City Center BRTS": [21.1850, 72.8300]
};

// 6 Major BRTS Corridors Geographic LatLng Lines
const brtsCorridorsGeo = [
  { name: "Line 1: Udhna–Sarthana", color: "#E53935", points: [[21.232, 72.905], [21.218, 72.885], [21.210, 72.865], [21.2052, 72.8406], [21.2023, 72.8322], [21.1895, 72.8465], [21.168, 72.842], [21.134, 72.845], [21.082, 72.859]] },
  { name: "Line 2: Jahangirpura–Katargam", color: "#1E88E5", points: [[21.232, 72.784], [21.210, 72.798], [21.196, 72.793], [21.182, 72.822], [21.2052, 72.8406], [21.225, 72.835], [21.240, 72.845]] },
  { name: "Line 3: Althan–Varachha", color: "#43A047", points: [[21.140, 72.810], [21.152, 72.815], [21.168, 72.812], [21.185, 72.830], [21.1895, 72.8465], [21.210, 72.865], [21.232, 72.905]] },
  { name: "Line 4: Airport–Lal Darwaja", color: "#FB8C00", points: [[21.114, 72.742], [21.148, 72.795], [21.178, 72.812], [21.2023, 72.8322]] },
  { name: "Line 5: Dumas–Textile Market", color: "#8E24AA", points: [[21.080, 72.709], [21.139, 72.775], [21.160, 72.783], [21.185, 72.830], [21.1895, 72.8465]] },
  { name: "Line 6: Pandesara–Ring Road", color: "#00897B", points: [[21.145, 72.842], [21.168, 72.842], [21.189, 72.835], [21.215, 72.825]] }
];
