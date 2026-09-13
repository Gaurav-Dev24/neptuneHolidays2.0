// This is the server entry file

import "dotenv/config";

import app from "./app.js";

const PORT = Number(process.env.PORT ?? 4000);

app.listen(PORT, () => {
    console.log(`Neptune local API running on http://localhost:${PORT}`);
});