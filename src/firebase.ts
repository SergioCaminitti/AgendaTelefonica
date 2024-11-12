import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";

export interface PhoneNumber {
    includes(searchQuery: string): unknown;
    id: string; 
    number: string; 
}

export interface Contact {
    id: string; 
    name: string;
    age: number;
    phoneNumbers: PhoneNumber[];
}

const firebaseConfig = {
  apiKey: "AIzaSyCDl8o_n_tsXQUWlc34j2E71h-FzW4u3Jw",
  authDomain: "contacts-c5584.firebaseapp.com",
  projectId: "contacts-c5584",
  storageBucket: "contacts-c5584.firebasestorage.app",
  messagingSenderId: "981641668004",
  appId: "1:981641668004:web:4daf6ba29b36e740024d31"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Função para escutar contatos e obter subcoleção de telefones
export const listenContacts = (callback: (contacts: Contact[]) => void) => {
    const unsubscribe = onSnapshot(collection(db, 'contacts'), async (snapshot) => {
        const contacts: Contact[] = await Promise.all(snapshot.docs.map(async (contactDoc) => {
            const phonesSnapshot = await getDocs(collection(db, 'contacts', contactDoc.id, 'telefones'));
            const phoneNumbers: PhoneNumber[] = phonesSnapshot.docs.map((phoneDoc) => ({
                id: phoneDoc.id,
                number: phoneDoc.data().number,
                includes: function (searchQuery: string) {
                    return this.number.includes(searchQuery);
                }
            }));
            return {
                id: contactDoc.id,
                name: contactDoc.data().name,
                age: contactDoc.data().age,
                phoneNumbers
            };
        }));
        callback(contacts);
    });
    return unsubscribe;
};

// Função para adicionar um contato com telefones
export const addContact = async (contact: { name: string; age: number; phoneNumbers: string[] }) => {
  try {
    const contactRef = await addDoc(collection(db, "contacts"), {
      name: contact.name,
      age: contact.age,
    });

    // Adicionar cada telefone como documento na subcoleção "telefones"
    for (const number of contact.phoneNumbers) {
      await addDoc(collection(db, "contacts", contactRef.id, "telefones"), { number });
    }
    console.log("Contato e telefones adicionados com sucesso.");
  } catch (e) {
    console.error("Erro ao adicionar contato: ", e);
  }
};

// Função para deletar um contato e seus telefones
export const deleteContact = async (id: string) => {
  try {
    const contactRef = doc(db, "contacts", id);
    const phonesSnapshot = await getDocs(collection(db, "contacts", id, "telefones"));
    
    // Deletar cada telefone da subcoleção "telefones"
    await Promise.all(phonesSnapshot.docs.map(phoneDoc => deleteDoc(phoneDoc.ref)));
    
    // Deletar o contato em si
    await deleteDoc(contactRef);
    console.log(`Contato com ID ${id} e seus telefones deletados com sucesso.`);
  } catch (error) {
    console.error("Erro ao deletar contato: ", error);
  }
};

// Função para obter contato com seus telefones
export const getContact = async (id: string): Promise<Contact | null> => {
  const docRef = doc(db, "contacts", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const phonesSnapshot = await getDocs(collection(db, "contacts", id, "telefones"));
  const phoneNumbers: PhoneNumber[] = phonesSnapshot.docs.map((phoneDoc) => ({
    id: phoneDoc.id,
    number: phoneDoc.data().number,
    includes: function (searchQuery: string) {
      return this.number.includes(searchQuery);
    }
  }));

  return {
    id: docSnap.id,
    ...docSnap.data(),
    phoneNumbers
  } as Contact;
};

// Função para atualizar contato e seus telefones
export const updateContact = async (id: string, data: Contact) => {
  const docRef = doc(db, "contacts", id);
  
  // Atualizar informações do contato
  await updateDoc(docRef, {
    name: data.name,
    age: data.age
  });

  // Atualizar a subcoleção "telefones"
  const phonesRef = collection(db, "contacts", id, "telefones");

  // Deletar telefones antigos
  const phonesSnapshot = await getDocs(phonesRef);
  await Promise.all(phonesSnapshot.docs.map(phoneDoc => deleteDoc(phoneDoc.ref)));

  // Adicionar novos telefones
  for (const phone of data.phoneNumbers) {
    await addDoc(phonesRef, { number: phone.number });
  }
};
