import * as cheerio from "cheerio";

type Sections = {
  [key: string]: string;
};

export const extractSections = (html: string): Sections => {
  const $ = cheerio.load(html);
  const sections: Sections = {};
  const headings = [
    "Facts",
    "Analysis of the Law",
    "Court's Reasoning",
    "Conclusion",
  ];

  headings.forEach((heading) => {
    const headingElement = $(`h2:contains("${heading}")`);
    if (headingElement.length) {
      const content: string[] = [];
      let next = headingElement.next();

      while (next.length && !next.is("h2")) {
        content.push(next.text());
        next = next.next();
      }

      sections[heading] = content.join("\n");
    }
  });

  return sections;
};
