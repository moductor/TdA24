import { getAll, insertOne, type LecturerInput } from "./models/Lecturer";

const lecturers: LecturerInput[] = [
  {
    picture_url: "https://picsum.photos/200",
    title_before: "prof. Ing.",
    first_name: "Dominik",
    last_name: "Bartuška",
    title_after: "Ph.D. ThDr.",
    claim: "",
    price_per_hour: 9999999,
    location: "České Budějovice",
    tags: [
      { name: "TdA24" },
      { name: "Tour de France" },
      { name: "HTML4ever" },
    ],
    bio: "",
    contact: {
      emails: ["testabc@outlook.com"],
      telephone_numbers: ["+420 123 456 789"],
    },
  },
  {
    title_before: "Mgr.",
    first_name: "Petra",
    middle_name: "Swil",
    last_name: "Plachá",
    title_after: "MBA",
    picture_url:
      "https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp",
    location: "Brno",
    claim: "Bez dobré prezentace je i nejlepší myšlenka k ničemu.",
    bio: "<b>Formátovaný text</b> s <i>bezpečnými</i> tagy.",
    tags: [
      {
        name: "Marketing",
      },
    ],
    price_per_hour: 720,
    contact: {
      telephone_numbers: ["+123 777 338 111"],
      emails: ["user@example.com"],
    },
  },
];

(async () => {
  const allLecturers = await getAll();
  if (allLecturers.length > 0) return;
  lecturers.forEach(insertOne);
})();
