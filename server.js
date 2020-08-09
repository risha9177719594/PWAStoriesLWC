'use strict';

const express = require('express'),
    path = require('path'),
    compression = require('compression'),
    app = express(),
    ENV = process.env.NODE_ENV || 'development',
    HOST = process.env.HOST || 'localhost',
    PORT = process.env.PORT || 3001,

    contacts = [
        { id: 1, firstName: 'Amy', lastName: 'Taylor', phone: '(415) 256-8563' },
        { id: 2, firstName: 'Michael', lastName: 'Jones', phone: '(415) 852-6633' },
        { id: 3, firstName: 'Jennifer', lastName: 'Wu', phone: '(415) 852-1463' },
        { id: 4, firstName: 'Anup', lastName: 'Gupta', phone: '(415) 852-6398' },
        { id: 5, firstName: 'Caroline', lastName: 'Kingsley', phone: '(415) 875-3654' },
        { id: 6, firstName: 'Jonathan', lastName: 'Bradley', phone: '(415) 888-5522' }
    ];
    stories = [
        { id: 1, name: 'నాలుగు ఆవులు', story: 'ఒక ఊరిచివర పచ్చని మైదానం లో నాలుగు ఆవులు ఎంతో సఖ్యం గా , స్నేహంగా ఉండేవి. కలిసి గడ్డి మేయటం, కలిసి తిరగడం చేసేవి. ఇవి ఎప్పుడూ కలిసి మెలిసి గుంపు గానే ఉండేవి కాబట్టి, పులి, సింహాలు వీటి జోలికి రాలేకపోయేవి.  కొంతకాలానికి, ఎదో విషయంలో వాటిమధ్య దెబ్బలాట జరిగి, నాలుగు ఆవులు నాలుగు వైపులా విడి విడిగా గడ్డి మెయ్యటానికి వెళ్లాయి. ఇదే సరైన సమయమని, పులి, సింహం పొదల్లో దాక్కుని, ఒకొక్కదాన్ని చంపేశాయి.', tag: '',img:'https://cdn2.momjunction.com/wp-content/uploads/2019/04/Four-cows.jpg' }        
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
    res.send(contacts);
});

app.get('/api/stories', (req, res) => {
    res.send(stories);
});

app.listen(PORT, () =>
    console.log(`✅ Server started: http://${HOST}:${PORT}`)
);
