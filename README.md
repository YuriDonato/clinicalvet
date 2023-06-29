# Clinical Vet

The purpose of this website/app is to provide a platform for veterinarians to quickly analyze the patient's symptoms and help diagnose the probable pathologies, by %, and also in a secondary way, I want to make an area to read clinical exams, such as blood count.

### What problem does this solve?

It's not really a problem, but most veterinarians have a delay in diagnosis due to the extensive list of diseases and all with similar pathologies, a site that automatically filters these pathologies would speed things up a lot.

### Goals

- Provide a complete list of symptoms and veterinary pathologies.
- Provide a CBC reader.

### Technical breakdown

I had previously done it in pure HTML/CSS/JavaScript, which can be seen in the demo, but after the proposed homework I'm thinking of migrating everything to React/NextJS and using TailwindCSS for styling, in the backend I'll use JavaScript for the most part of the search engine and pathology filter.

I've already made a .json with all the symptoms, and I think I'll have to do a kind of registration of the diseases in a similar way, I don't have enough technical knowledge, but I think I'll need some kind of database, like MongoDB or something like that, I'm open to learning new things to make it work!

I need to make the site responsive for tablets, cell phones and computers, and I intend to publish it on vercel when the project is finished.

# Demo

In this initial version of the site, the blood count reader does not exist, and the central button "Clinica" (Clinic in portuguese) takes you to the symptomatology filter page, and the button on the right side "Doenças" (Disease in portuguese) leads to a search for diseases to read the description, see symptoms, and others
https://clinicalvet.vercel.app/
