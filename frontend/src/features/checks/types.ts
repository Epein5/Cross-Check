export type CheckStatus = "pending" | "passed" | "failed";

export type Check = {
  id: string;
  title: string;
  status: CheckStatus;
};
