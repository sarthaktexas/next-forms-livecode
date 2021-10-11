const AirtablePlus = require("airtable-plus")

const airtable = new AirtablePlus({
    baseID: 'appMyPPfesDHqUdE1',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "Names",
    camelCase: true,
    transform: r => {
        delete r.id
        return r.fields
    }
})

export default async (_, res) => {
    const names = await airtable.read();
    res.json(names)
}