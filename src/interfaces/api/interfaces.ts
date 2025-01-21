export interface Task {
  title: string;
  status: "todo" | "inProgress" | "done";
  dueDate: Date;
  description: string;
  assignedUser: number;
  priority: "high" | "low" | "medium";
  tags: string[];
}

export interface Credentials {
  username: string;
  password: string;
}

export interface User {
    id:string,
    name:string,
    email:string
}
