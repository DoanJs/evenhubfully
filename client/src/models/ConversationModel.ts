export interface ConverstationModel {
  avatar: string;
  createAt: number;
  creatorId: number;
  deleteAt: number;
  id: string;
  isGroup: boolean;
  msgLast: string;
  msgSenderLast: number;
  msgTimeLast: string;
  participants: number[];
  title: string;
  updateAt: number;
}
