import { getHhVacancyUrl } from "../../utils/index";
import type { NextApiRequest, NextApiResponse } from "next";
import { HttpMethod } from "utils";
import axios from "axios";
import { JSDOM } from "jsdom";

type Data = {
  count: number;
};

const VACANCY_BLOCK_SELECTOR = ".bloko-header-section-3";

export default async function vacancy(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = `${req.query.query}`;

  const defaultHandler = () => res.status(405);

  const handler =
    {
      [HttpMethod.Get]: async () => {
        try {
          const { data } = await axios.get(getHhVacancyUrl(query), {
            headers: {
              accept: "text/html",
            },
          });

          const { document } = new JSDOM(data).window;

          const vacancyText = document.querySelector(VACANCY_BLOCK_SELECTOR)
            ?.firstChild?.textContent;
          const vacancyCount = parseInt(vacancyText || "0") || 0;

          res.status(200).json({ count: vacancyCount });
        } catch (error) {
          res.status(500);
        }
      },
    }[
      // @ts-expect-error undefined can be used as index
      req.method
    ] ?? defaultHandler;

  await handler();
}
