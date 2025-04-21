import * as cheerio from 'cheerio';

type Sections = {
  [key: string]: string;
};

const normalizeText = (text: string): string =>
  text.trim().toLowerCase().replace(/\s+/g, ' ');

const cleanContent = (text: string): string =>
  text
    .replace(/\n\s*\n+/g, '\n\n')
    .replace(/\t+/g, '')
    .replace(/Signature Not Verified.*?Neutral Citation Number: 2023\/DHC\/001544/g, '')
    .trim();

export const extractSections = (
  html: string,
  sectionsToExtract: string[] = ['Facts', 'Analysis of the Law', "Court's Reasoning", 'Conclusion']
): Sections => {
  const $ = cheerio.load(html); // Remove all options

  $('script, style, header, footer, nav').remove();

  const sections: Sections = {};

  const sectionMapping: { [key: string]: string[] } = {
    Facts: ['Facts'],
    'Analysis of the Law': ['Precedent', 'Section'],
    "Court's Reasoning": ['CDiscourse', 'RespArg'],
    Conclusion: ['Conclusion'],
  };

  sectionsToExtract.forEach((section) => {
    const dataStructures = sectionMapping[section] || [section];
    const content: string[] = [];

    dataStructures.forEach((dataStructure) => {
      const elements = $(`p[data-structure="${dataStructure}"]`);
      elements.each((_, el) => {
        const text = $(el)
          .contents()
          .toArray()
          .map((node) =>
            node.type === 'text' ? $(node).text() : $(node).text()
          )
          .join(' ')
          .trim();

        if (text) {
          content.push(text);
        }

        let next = $(el).next();
        while (next.length && !next.is('p[data-structure]')) {
          const nextText = next
            .contents()
            .toArray()
            .map((node) =>
              node.type === 'text' ? $(node).text() : $(node).text()
            )
            .join(' ')
            .trim();

          if (nextText) {
            content.push(nextText);
          }
          next = next.next();
        }
      });
    });

    const sectionContent = cleanContent(content.join('\n'));
    if (sectionContent) {
      sections[section] = sectionContent;
    }
  });

  return sections;
};