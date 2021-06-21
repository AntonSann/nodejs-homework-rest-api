const path = require('path')
const fsPromises = require('fs').promises
const db = require('./db')
const { ObjectId } = require('mongodb')
const contactsPath = path.resolve('model/contacts.json')

const getContactsCollection = async () => {
  const client = await db
  const collection = await client.db().collection('contacts')
  return collection
}

const listContacts = async () => {
  try {
    const collection = await getContactsCollection()
    const contacts = await collection.find({}).toArray()
    return contacts
  } catch (error) {
    console.error(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const objectId = new ObjectId(contactId)

    const collection = await getContactsCollection()
    const [contact] = await collection.find({ _id: objectId }).toArray()
    return contact
  } catch (error) {
    console.error(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const objectId = new ObjectId(contactId)
    const collection = await getContactsCollection()

    const { value: result } = await collection.findOneAndDelete({ _id: objectId })
    return result
  } catch (error) {
    console.error(error)
  }
}

const addContact = async (body) => {
  try {
    const collection = await getContactsCollection()
    const { ops: [result] } = await collection.insertOne(body)
    return result
  } catch (error) {
    console.error(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const objectId = new ObjectId(contactId)
    const collection = await getContactsCollection()

    const { value: result } = await collection.findOneAndUpdate({ _id: objectId },
      { $set: body }, { returnOriginal: false })
    return result
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
