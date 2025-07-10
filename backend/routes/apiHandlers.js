// backend/routes/apiHandlers.js
app.post('/api/departure/submit', (req, res) => {
    console.log('📨 Departure:', req.body);
    res.json({ status: 'ok', message: 'Departure submitted' });
});

app.post('/api/stowage/instruction', (req, res) => {
    console.log('📦 Stowage:', req.body);
    res.json({ status: 'ok' });
});

app.post('/api/fal/form1', (req, res) => {
    console.log('🧾 FAL1:', req.body);
    res.json({ status: 'ok', pdfLink: '/fal/form1/generated.pdf' });
});

app.post('/api/crew/upload', upload.single('file'), (req, res) => {
    console.log('👨‍✈️ Crew manifest uploaded:', req.file.originalname);
    res.json({ status: 'ok' });
});

app.post('/api/passenger/upload', upload.single('file'), (req, res) => {
    console.log('👩‍👦 Passenger manifest uploaded:', req.file.originalname);
    res.json({ status: 'ok' });
});
