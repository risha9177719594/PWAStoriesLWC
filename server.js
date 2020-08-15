'use strict';

const express = require('express'),
    path = require('path'),
    compression = require('compression'),
    app = express(),
    ENV = process.env.NODE_ENV || 'development',
    HOST = process.env.HOST || 'localhost',
    PORT = process.env.PORT || 3001,

    contacts = [
        { id: 1, name: 'నాలుగు ఆవులు', story: 'ఒక ఊరిచివర పచ్చని మైదానం లో నాలుగు ఆవులు ఎంతో సఖ్యం గా , స్నేహంగా ఉండేవి. కలిసి గడ్డి మేయటం, కలిసి తిరగడం చేసేవి. ఇవి ఎప్పుడూ కలిసి మెలిసి గుంపు గానే ఉండేవి కాబట్టి, పులి, సింహాలు వీటి జోలికి రాలేకపోయేవి.  కొంతకాలానికి, ఎదో విషయంలో వాటిమధ్య దెబ్బలాట జరిగి, నాలుగు ఆవులు నాలుగు వైపులా విడి విడిగా గడ్డి మెయ్యటానికి వెళ్లాయి. ఇదే సరైన సమయమని, పులి, సింహం పొదల్లో దాక్కుని, ఒకొక్కదాన్ని చంపేశాయి.', tag: '',img:'https://cdn2.momjunction.com/wp-content/uploads/2019/04/Four-cows.jpg' },
        { id: 2, name: 'ఏనుగు – స్నేహితులu', story: 'ఒక ఏనుగు ఒంటరిగా ఎవరైనా స్నేహితులు దొరుకుతారేమో అని ఆశగా తిరుగుతూ, కోతుల గుంపుని చూసి, “మీరు నాతొ స్నేహం చేస్తారా?” అని అడిగింది.  కోతులు, “అబ్బో! నువ్వెంత పెద్దగా ఉన్నావో? మా లాగా కొమ్మలు పట్టుకుని ఉయ్యాలా జంపాల ఊగగలవా? అందుకే మనకి స్నేహం కుదరదు,” అన్నాయి.  ఆ ఏనుగుకి కుందేలు కనిపించింది. “హాయ్ కుందేలు, నాతో స్నేహం చేస్తావా?” అని ఆశగా అడిగింది. “నువ్వు ఇంత పెద్దగా ఉన్నావ్, నాలాగా చిన్న బొరియలలో, కన్నాలలో దూరగలవా? మనకి స్నేహం ఎలా కుదురుతుంది?” అంది. ఆ తరువాత ఏనుగు ఒక కప్పని కలిసింది. దాన్నికూడా స్నేహం కోసం అడిగింది. “నువ్వు ఇంత పెద్దగా ఉన్నావు, నాలాగా గెంతలేవు. నీతో స్నేహం కుదరదు,”అని చెప్పింది. దారిలో నక్క కనిపిస్తే, దానిని కూడా అడిగి, కాదనిపించుకుంది. ఈలోగా, అడవిలోని జంతువులన్నీ చెల్లా చెదురుగా పరిగెడుతున్నాయి. “ఏమైంది? అంత భయంగా పారిపోతున్నారు?” అని ఒక ఎలుగుబంటి ని అడిగింది. “అయ్యో పులి జంతువుల్ని వేటాడుతోంది.” అని చెప్పి పారిపోయాయి. ఏనుగు ధైర్యంగా తన స్నేహితులనందర్నీ కాపాడాలని అనుకుంది. పులి కెదురుగా నిలబడి, “దయచేసి నా స్నేహితులని చంపద్దు,” అంది. “నీ పని నువ్వు చూసుకో …నీ కెందుకు వాళ్ళ గోల?” అంది పులి. తన మాట వినేట్టు లేదని, ఏనుగు పులి ని గట్టిగా కొట్టి బెదరకొట్టింది. పులి నెమ్మదిగా అక్కడినించి జారుకుంది. ఈ విషయం తెలుసుకున్న జంతువులన్నీ చాలా సంతోషించాయి. “నీ ఆకారం సరైనదే. ఇప్పట్నించీ నువ్వు మా అందరి స్నేహితుడివని ” ఎంతో మెచ్చుకున్నాయి.', tag: '',img:'https://cdn2.momjunction.com/wp-content/uploads/2019/04/Elephant-friends.jpg' },
        { id: 3, name: 'నిజమైన స్నేహితులు', story: 'శ్రీ కృష్ణుడు,సుధామ చిన్ననాటి స్నేహితులు. కృష్ణ వృద్ధి చెంది,పెరిగి,సంపన్నుడైనాడు. కానీ సుధామ బీదతనంతో చిన్న గుడిసె లోనే తన భార్య,పిల్లలతో అవస్థలు పడుతూ జీవిస్తున్నాడు. చివరికి పిల్లల ఆకలిని కూడా తీర్చలేని గడ్డు పారిస్తుతులొచ్చాయి. అంత సుధామ భార్య, కృష్ణుడి వద్దకి వెళ్లి, సహాయం అడగమని సలహా ఇచ్చింది. మిత్రుడి దగ్గిరకెళ్ళి సహాయం అడగాలంటే సుధామకి చాలా మొహమాటం, సిగ్గు అడ్డువచ్చిన, వాటిని పక్కనపెట్టి, తెగించి ద్వారకకి వెళ్ళాడు. సుధామ భార్య కృష్ణుడికి ఇష్టమైనా అటుకులు చేసి ఇచ్చింది. ద్వారకా నగర వైభవాన్ని చూసి తెగ ఆశ్చర్య పడ్డాడు.రాజభవనం వద్ద ఉన్న ద్వారపాలకులు సుధామ చిరిగిన పంచ, అవతారం చూసి ,లోపలికి పంపించలేదు. కానీ ఈ సమాచారం, అంటే, సుధామ వొచ్చి,తన ద్వారం దగ్గిర వేచిఉన్నాడన్న మాట విని కృష్ణ్ణుడు మహా ఆనందపడి, చేస్తున్న పని ఆపేసి, ఆత్రంగా పరిగెత్తి వొచ్చి, సుధామని ఆప్యాయంగా కౌగలించుకుని, లోపలికి ఆహ్వానించాడు స్వయంగా. అంతేకాదు చాలా ప్రేమగా, గౌరవంగా, సుధామ కాళ్ళు కడిగి, తన పక్కనే కూర్చోబెట్టుకుని, చిన్ననాటి మధురస్మృతుల్ని తలుచుకుని నవ్వుకున్నారు. అంత గొప్పగా ఉన్న రాజు, శ్రీమంతుడు అయిన శ్రీకృష్ణుడి కి తాను తెచ్చిన అటుకులు ఇవ్వవడానికి సిగ్గు పడి వెనక్కి దాచేసాడు సుధామ. అది గమనించిన కృష్ణుడు, అడిగి మరీ చేతిలోంచి తీసుకుని, మూట విప్పి తినసాగాడు. శ్రీకృష్ణుని ప్రేమకి, ఆదరణకి సుధామ చాలా సంతోషించాడు. సెలవు తీసుకుని తన ఊరు వచేసాడు. వొచ్చేసరికి అతని గుడిసె పోయి మంచి భవనం, పిల్లలు, భార్య మంచి దుస్తులు ధరించి, కళకళ లాడుతూ కనిపించారు. తనెంత అదృష్టవంతుడో అనుకున్నాడు సుధామ. నోరు తెరిచి ఏమీ చెప్పలేదు, సహాయం అడగలేదు, అయినా కృష్ణుడు తెలుసుకుని తనకి ఏమి కావాలో ఇచ్చేసాడు. అదే నిజమైన స్నేహమంటే, అని అనుకుని మురిసిపోయాడు.', tag: '',img:'https://cdn2.momjunction.com/wp-content/uploads/2019/04/True-friends.jpg' },
        { id: 4, name: 'నలుగురి స్నేహితులు', story: 'ఒక కాలేజ్ లో నలుగురు స్నేహితులున్నారు. వాళ్లకి చదువు అంటే ఇష్టం లేదు. సరిగ్గా పరీక్షల ముందు రాత్రంతా పార్టీ కెళ్ళి, మర్నాడు పరీక్షరాయకుండా, తిన్నగా కాలేజ్ పెద్ద దగ్గిరకెళ్ళి, “నిన్న రాత్రి ఒక పెళ్ళికి వెళ్లి తిరిగి వస్తుంటే, కార్ టైరు పంచేరైంది. దానిని తోసుకుంటూ వొచ్చేసరికి బాగా అలిసి పోయాము, ఇప్పుడు పరీక్ష రాసే ఓపిక లేదు,” అని కల్పించి ఒక కథ చెప్పారు. కాలేజ్ పెద్ద, “సరే, పరీక్ష వొచ్చేవారంలో రాయమని చెప్పాడు. వీళ్ళు నలుగురు మోసం కబుర్లతో ఆయనని బోల్తా కొట్టించామనుకుని తెగ సంతోషించారు. తరువాత వారం పరీక్షకి సిద్ధం అయి వచ్చారు. వాళ్ళ నలుగురిని విడి విడి క్లాసుల్లో కూర్చోమని వాళ్లకి ఒకటే ప్రశ్న పత్రం ఇచ్చారు. అందులో రెండే రెండు ప్రశ్నలున్నాయి 1౦౦ మార్కులకి: నీపేరు: ఏ టైరు పంక్చర్ అయింది? దీనికి, ఒక్కో స్నేహితుడు ఒక్కో సమాధానం ఇలా రాసారు: 1. కుడి వైపు టైరు 2. ఎడమ వైపు టైరు ౩. వెనుక కుడి టైరు 4. వెనుక ఎడమ టైరు.', tag: '',img:'https://cdn2.momjunction.com/wp-content/uploads/2019/04/Four-friends.jpg' },
        { id: 5, name: 'నాన్నా, అదిగో తోడేలు', story: 'ఒకానొక గుట్ట మీద చిన్న పల్లెటూరు. ఒక రైతు, తన చిన్న కొడుకుని గొర్రెలు కాయటానికి తనతో తీసుకెళ్లాడు. పిల్లవాడిని గొర్రెలు చూస్తూ ఉండమని, తోడేలు వస్తే వెంటనే అరవమని చెప్పి, రైతు కొద్ది దూరంలోఉన్న తన పొలం లో పని చేసుకోడానికి వెళ్ళాడు. కొంతసేపటికి ఆ పిల్లాడికి ఏమీ తోచలేదు. నాన్నా వాళ్ళని ఆటపట్టించాలని ,”బాబోయ్ తోడేలు, అదిగో తోడేలు,” అంటూ గట్టిగా అరిచాడు. అది వింటూనే ఖంగారుగా రైతు, మిత్రులు కర్రలు పట్టుకుని పరిగెత్తుకొచ్చి, “ఏది తోడేలు?” అని అడిగారు. పిల్లాడు పక పక నవ్వుతు, “అబ్బె , ఉత్తినే అరిచా!” అన్నాడు. “ఇలా ఉత్తిత్తినే అరవకు. మా పని పాడుచెయ్యకని” మందలించి రైతు వెళ్ళిపోయాడు. కాస్సేపటికి మళ్ళీ కొంటె గా, “బాబోయ్ తోడేలు” అని పెద్దగా అరవటం, మళ్ళీవాళ్ళంతా కర్రలతో పరిగెట్టుకు రావటం, పిల్ల వాడు మళ్ళీ పెద్దగా నవ్వుతూ “బ్బే !ఉత్తినే అరిచా” అనటం జరిగిపోయింది. “ఇలా ఆకతాయి పనులు చేస్తే నిన్ను ఎవ్వరు నమ్మరు” అంటూకేకలేసి మళ్ళీ తమ పనిలో నిమగ్నమయ్యారు. కాస్సేపట్లో నిజంగానే ఒక తోడేలు వచ్చి ఒక గొర్రె పిల్ల మీద కి దూకింది. కుర్రాడు భయంతో గట్టిగా “నాన్నా! బాబోయ్ తోడేలు గొర్రెని చంపేస్తోంది, రండి తొందరగా రండి,” అంటూ పెద్దగా ఆరవ సాగాడు. “ఈ ఆకతాయి పిల్లడు మళ్ళీ అరుస్తున్నాడు,” అని వాణ్ని పట్టించుకోలేదు రైతు. తోడేలు గొర్రె పిల్లని నోటకరుచుకుని అడవిలోకి ఈడ్చుకు పోయింది. పిల్లాడు ఒక పొద పక్కన కూర్చొని భయంతో ఏడుస్తూ కనిపించాడు. పని ముగించుకుని వచ్చిన రైతు కొడుకు ఏడుస్తూ ఉండటం చూసి, “ఎందుకు ఏడుస్తున్నావని?” అడిగాడు. తండ్రిని చూడగానే “తోడేలు వచ్చిందని గట్టిగా అరచినా మీరెందుకు రాలేదు, తోడేలు గొర్రె పిల్లని చంపి ఎత్తుకు పోయింది. నేను భయంతో ఇక్కడ కూర్చుండిపోయా. ఎందుకు రాలేదు?” అన్నాడు కోపంగా. దానికి రైతు “అబద్దాలాడే వాడి మాట ఎవ్వరు నమ్మరు, పట్టించుకోరు,” అని చెప్పి ఓదార్చి, మిగిలిన గొర్రెలని తోలుకుని ఇద్దరూ ఇంటికి పోయారు.', tag: '',img:'https://cdn2.momjunction.com/wp-content/uploads/2019/04/Dad-its-a-wolf.jpg' },
        { id: 6, name: 'మిడాస్ స్పర్శ', story: 'ప్రాచీన గ్రీకు రాజు పేరు మిడాస్. ఆ రాజుకి బంగారం అంటే చాలా ఇష్టం. ఆ రాజు కి చాలా సంపద ఉంది. అతనికి ఒక చక్కని కూతురు కూడా ఉంది. ఒక రోజు ఆ రాజు బంగారు నాణాలు లెక్కించుకుంటూ ఉండగా ఒక అదృష్ట దేవత ఎదురుగా కనపడింది. రాజు చాలా ఆదరించి, గౌరవించాడు. అతని మర్యాదలకి సంతోషించి ,అదృష్ట దేవత, ఏదైనా వరం కోరుకోమంది. ఆ రాజు అస్సలు ఆలోచించకుండా, “నేను ఏది నా చేతితో తాకితే, అది బంగారం గా మారాలని,” కోరాడు. దేవత కి తెలుసు ఇదేమంత గొప్ప వరం కాదని, కానీ అడిగాడని, కాదనక, రాజుకా వరం ఇచ్చేసింది. రాజు మహా సంతోషంతో, ఎదురుగా ఉన్న ఒక ఆపిల్ పండు ని ముట్టుకున్నాడు. అది వెంటనే మెరిసిపోతూ బంగారు పండు గా మారిపోయింది. ఇంకా వెర్రి ఆనందంగా రాజా భవనం లోని వొస్తువుల్ని బంగారు మయం చేస్తుండగా, అక్కడికి వాళ్ళమ్మాయి వొచ్చింది. పరమానానందంతో గబా గబా వెళ్లి పట్టేసుకున్నాడు. అంతే, ఆ పాప జీవం లేని ఒక బంగారు బొమ్మగా మారిపోయింది. అదిచూసి రాజు ఏడుస్తూ, ఆ అదృష్ట దేవత కోసం ప్రార్ధించాడు. “నాకీ శక్తి వొద్దు. నా పిల్ల కి మామూలు రూపం రావాలని,” ప్రార్ధించాడు. బంగారంగా మారినవన్నీ మళ్ళీ యధా రూపం లోకి వొచ్చాయి. అమ్మాయిని చూసుకుని రాజు మురిసిపోయాడు. రాజుకి బుధ్ధి వొచ్చింది. తనకున్న దానితో హాయిగా, తృప్తిగా జీవించటం నేర్చుకున్నాడు.', tag: '',img:'https://cdn2.momjunction.com/wp-content/uploads/2019/04/Midas-Touch.jpg' }
    ];

if (ENV === 'production') {
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
        return next();
    });
}

app.use(compression());
app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('/api/contacts', (req, res) => {
    //debugger;
    fetch('https://myrisha1.herokuapp.com/people/restExampleString/rest').then(response => response.json()).then(data => res.send(data));
    
});

app.listen(PORT, () =>
    console.log(`✅ Server started: http://${HOST}:${PORT}`)
);
