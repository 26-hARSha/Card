import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICardProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  listUrl:string;
  listName:string;
  context:WebPartContext;
}
