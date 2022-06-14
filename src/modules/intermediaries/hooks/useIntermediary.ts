import { useQuery } from "react-query";

import services from "@src/services";

export const useIntermediary = (intermediaryId: string) =>
  useQuery(["intermediary", intermediaryId], () =>
    services.intermediaries.getIntermediaryById(intermediaryId)
  );
