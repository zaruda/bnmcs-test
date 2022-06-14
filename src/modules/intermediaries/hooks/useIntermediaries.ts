import { useQuery } from "react-query";

import services from "@src/services";

export const useIntermediaries = () =>
  useQuery("intermediaries", () => services.intermediaries.getIntermediaries());
