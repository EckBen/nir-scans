import { ID, Query } from 'react-native-appwrite';
import databaseService from './databaseService';

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  // Get notes
  async getNotes(user_id) {
    if (!user_id) {
      console.error('Error: Missing user_id in getNotes()');
      return { data: [], error: 'User ID is missing' };
    }

    try {
      const response = await databaseService.listDocuments(dbId, colId, [
        Query.equal('user_id', user_id)
      ]);
      if (response.error) {
        return { error: response.error };
      }
  
      return response;
    } catch (error) {
      console.error('Error fetching notes:', error.message);
      return { data: [], error: error.message };
    }
  },
  // Add new note
  async addNote(user_id, text) {
    if (!text) {
      return { error: 'Note text cannot be empty' };
    }

    const data = {
      user_id: user_id,
      text: text,
      createdAt: new Date().toISOString()
    };

    const response = await databaseService.createDocument(dbId, colId, data, ID.unique());

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
  // Update note
  async updateNote(id, text) {
    const response = await databaseService.updateDocument(dbId, colId, id, { text });

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
  // Delete note
  async deleteNote(id) {
    const response = await databaseService.deleteDocument(dbId, colId, id);

    if (response?.error) {
      return { error: response.error };
    }

    return { success: true };
  }
};

export default noteService;