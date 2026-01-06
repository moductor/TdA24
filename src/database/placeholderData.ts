import { getCount, insertOne, removeAll } from "./functions/Lecturer";
import { LecturerInput } from "./models/Lecturer";
import { TagBase } from "./models/Tag";

const lecturers: LecturerInput[] = [
  {
    picture_url: "https://avatars.githubusercontent.com/u/71775710?v=4",
    first_name: "Dominik",
    last_name: "Bartuška",
    claim: "Kvalita a rychlost je mým uměním",
    price_per_hour: 1500,
    location: "České Budějovice",
    tags: [{ name: "TdA24" }, { name: "HTML4ever" }],
    contact: {
      emails: ["testabc@outlook.com"],
      telephone_numbers: ["+420 123 456 789"],
    },
  },
  {
    first_name: "Vojtěch",
    last_name: "Perník",
    picture_url: "https://avatars.githubusercontent.com/u/71781857?v=4",
    location: "České Budějovice",
    claim: "Simple apps built with passion",
    bio: "<p>My name is <b>Vojtěch Perník</b>, I'm a 17 years old student from the Czech Republic, who is passionate about code.</p><p>I got into programming in early 2020 when I wanted to follow my father’s journey. I learned Java and I enjoyed it very much.</p><p>In September 2020 I completely switched to Linux and I still use Fedora today. At that time I became interested in GNOME and GTK and started learning Vala, followed by JavaScript, Python and Dart.</p>",
    tags: [
      { name: "TdA24" },
      { name: "HTML4ever" },
      { name: "Dart" },
      { name: "Vala" },
      { name: "GTK" },
      { name: "Linux" },
      { name: "GNOME" },
    ],
    price_per_hour: 1250,
    contact: {
      telephone_numbers: ["+420 987 654 321"],
      emails: ["user@example.com"],
    },
  },
];

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(min: number, max: number): number {
  return min + Math.round((max - min) * Math.random());
}

function getRandomBool(): boolean {
  return Boolean(Math.round(Math.random()));
}

type Gender = "male" | "female";
function getRandomGender(): Gender {
  const genders: Gender[] = ["male", "female"];
  return getRandomItem(genders);
}

function getRandomFirstName(gender: Gender): string {
  const firstNames: { [key in Gender]: string[] } = {
    male: ["Jiří", "Petr", "Josef", "Pavel", "Martin", "Tomáš"],
    female: ["Jana", "Marie", "Eva", "Hana", "Anna", "Lenka"],
  };
  return getRandomItem(firstNames[gender]);
}

function getRandomLastName(gender: Gender): string {
  const lastNames: { [key in Gender]: string[] } = {
    male: ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka"],
    female: ["Veselá", "Fialová", "Křížová", "Malá", "Tichá", "Bláhová"],
  };
  return getRandomItem(lastNames[gender]);
}

function getRandomLocation(): string {
  const locations = [
    "České Budějovice",
    "Praha",
    "Brno",
    "Ostrava",
    "Liberec",
    "Plzeň",
    "Jihlava",
    "Hradec Králové",
  ];

  return getRandomItem(locations);
}

function getRandomTag(): string {
  const tags = [
    "TdA24",
    "HTML4ever",
    "Dobrovolnictví",
    "Studentské spolky",
    "Efektivní učení",
    "Prezentační dovednosti",
    "Marketing",
    "Mimoškolní aktivity",
    "Projektový management",
    "Fundraising",
    "JavaScript",
    "TypeScript",
    "Dart",
    "Linux",
    "C",
    "C++",
    "Matematika",
    "Český jazyk",
  ];

  return getRandomItem(tags);
}

function getRandomTags(): TagBase[] {
  const count = getRandomNumber(3, 8);
  const tags: TagBase[] = [];
  for (let i = 0; i < count; i++) {
    tags.push({ name: getRandomTag() });
  }
  return tags;
}

const getRandomPrice = () => getRandomNumber(500, 3000);

function getRandomLecturer(): LecturerInput {
  const gender = getRandomGender();

  const firstName = getRandomFirstName(gender);
  const lastName = getRandomLastName(gender);

  let middleName: string | undefined;
  if (getRandomBool()) {
    do {
      middleName = getRandomLastName(gender);
    } while (middleName == lastName);
  }

  const location = getRandomLocation();
  const tags = getRandomTags();
  const price = getRandomPrice();

  const seed = `${firstName} ${middleName} ${lastName} ${location} ${price}`;
  const image = `https://picsum.photos/seed/${seed}/512/512`;

  return {
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    location: location,
    tags: tags,
    price_per_hour: price,
    picture_url: image,
  };
}

function getRandomLecturers(count: number): LecturerInput[] {
  const lecturers: LecturerInput[] = [];
  for (let i = 0; i < count; i++) {
    lecturers.push(getRandomLecturer());
  }
  return lecturers;
}

export default async function createPlaceholderData(clear = false) {
  if ((await getCount()) > 0) {
    if (!clear) return;
    await removeAll();
  }

  const data = [...lecturers, ...getRandomLecturers(50)];
  for (const lecturer of data) {
    await insertOne(lecturer);
  }
}
