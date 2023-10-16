// Assets list

import { CustomHead, Department, Laboratory, Organization } from "../modals";
import { AssetsHead } from "../modals/assets.modal";
import { UserHead } from "../modals/user.modal";
import { RunzHead } from "../modals/runz.modal";
import { ProceduresHead } from "../modals/Procedures.modal";

export const AssetsHeaders: readonly AssetsHead[] = [
  {
    id: "assetNumber",
    label: "Assets ID",
    filters: [
      {
        id: "assetNumber",
        type: "select",
        label: "Assest Id",
        options: [
          { value: "ID1001", label: "ID1001" },
          { value: "ID1002", label: "ID1002" },
          { value: "ID1003", label: "ID1003" },
          { value: "ID1004", label: "ID1004" },
          { value: "ID1005", label: "ID1005" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "name",
    label: "Assets Name",
    filters: [
      {
        id: "search",
        type: "textfield",
        label: "search",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "departmentId",
    label: "Department",
    filters: [
      {
        id: "dept",
        type: "select",
        label: "Department",
        options: [
          { value: "Computer science", label: "Computer science" },
          { value: "Cyber security", label: "Cyber security" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "laboratoryId",
    label: "Lab",
    filters: [
      {
        id: "lab",
        type: "select",
        label: "Lab",
        options: [
          { value: "Data mining", label: "Data mining" },
          { value: "Data warehouse", label: "Data warehouse" },
          { value: "OOPS", label: "OOPS" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "purchasedDate",
    label: "Purchased on",
    filters: [
      {
        id: "date",
        type: "date",
        label: "DD/MM/YYYY",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "updatedAt",
    label: "Last used",
    filters: [
      {
        id: "date",
        type: "date",
        label: "DD/MM/YYYY",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "status",
    label: "Status",
    filters: [
      {
        id: "status",
        type: "autocomplete",
        label: "-Select status-",
        options: [
          { value: "1", label: "Fully Working" },
          { value: "2", label: "Not Working" },
          { value: "3", label: "Issue" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "availability",
    label: "Availability",
    filters: [
      {
        id: "availability",
        type: "autocomplete",
        label: "-Select availablity-",
        options: [
          { value: "1", label: "Available" },
          { value: "2", label: "Not available" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
];

export const UserHeaders: readonly UserHead[] = [
  {
    id: "id",
    label: "User ID",
    filters: [
      {
        id: "user_id",
        type: "select",
        label: "User Id",
        options: [
          { value: "ID1001", label: "ID1001" },
          { value: "ID1002", label: "ID1002" },
          { value: "ID1003", label: "ID1003" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "firstName",
    label: "User Name",
    filters: [
      {
        id: "search",
        type: "textfield",
        label: "search",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "providerDetails",
    label: "Department",
    filters: [
      {
        id: "dept",
        type: "select",
        label: "Department",
        options: [
          { value: "Computer science", label: "Computer science" },
          { value: "Cyber security", label: "Cyber security" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "extraData",
    label: "Category",
    filters: [
      {
        id: "category",
        type: "select",
        label: "Category",
        options: [
          { value: "Data mining", label: "Data mining" },
          { value: "Data warehouse", label: "Data warehouse" },
          { value: "OOPS", label: "OOPS" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "organisationId",
    label: "Added on",
    filters: [
      {
        id: "date",
        type: "date",
        label: "DD/MM/YYYY",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "roleId",
    label: "Role",
    filters: [
      {
        id: "search",
        type: "textfield",
        label: "search",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "status",
    label: "Status",
    filters: [
      {
        id: "availability",
        type: "autocomplete",
        label: "-Select Status-",
        options: [
          { value: "1", label: "Available" },
          { value: "2", label: "Not available" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
];

export const CustomHeaders: readonly CustomHead[] = [
  {
    id: "id",
    label: "Field ID",
    filters: [
      {
        id: "id",
        type: "select",
        label: "Field Id",
        options: [
          { value: "CF1001", label: "CF1001" },
          { value: "CF1002", label: "CF1002" },
          { value: "CF1003", label: "CF1003" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "name",
    label: "Field Name",
    filters: [
      {
        id: "search",
        type: "textfield",
        label: "search",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "type",
    label: "Field Type",
    filters: [
      {
        id: "availability",
        type: "autocomplete",
        label: "-Select Type-",
        options: [
          { value: "1", label: "Text" },
          { value: "2", label: "Numberic" },
          { value: "3", label: "Select" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "group",
    label: "Field Group",
    filters: [
      {
        id: "availability",
        type: "autocomplete",
        label: "-Select Group-",
        options: [
          { value: "1", label: "Department" },
          { value: "2", label: "Lab" },
          { value: "3", label: "Status" },
          { value: "4", label: "Organization" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "status",
    label: "Status",
    filters: [
      {
        id: "availability",
        type: "autocomplete",
        label: "-Select Status-",
        options: [
          { value: "1", label: "Active" },
          { value: "2", label: "Inactive" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "added_on",
    label: "Added on",
    filters: [
      {
        id: "date",
        type: "date",
        label: "DD/MM/YYYY",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },
];

export const ProceduresHeaders: readonly ProceduresHead[] = [
  {
    id: "procedureNumber",
    label: "Procedure Id",
    filters: [
      {
        id: "assetNumber",
        type: "select",
        label: "ID  ",
        options: [
          { value: "ID1001", label: "ID1001" },
          { value: "ID1002", label: "ID1002" },
          { value: "ID1003", label: "ID1003" },
          { value: "ID1004", label: "ID1004" },
          { value: "ID1005", label: "ID1005" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "name",
    label: "Procedure Name",
    filters: [
      {
        id: "search",
        type: "textfield",
        label: "search",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "departmentId",
    label: "Department",
    filters: [
      {
        id: "dept",
        type: "select",
        label: "Department",
        options: [
          { value: "Computer science", label: "Computer science" },
          { value: "Cyber security", label: "Cyber security" },
          { value: "Data Mining", label: "Data Mining" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "laboratoryID",
    label: "Lab",
    filters: [
      {
        id: "lab",
        type: "select",
        label: "Lab",
        options: [
          { value: "Data mining", label: "Data mining" },
          { value: "Data warehouse", label: "Data warehouse" },
          { value: "OOPS", label: "OOPS" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "updatedAt",
    label: "Created on",
    filters: [
      {
        id: "date",
        type: "date",
        label: "DD/MM/YYYY",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },

  {
    id: "createdAt",
    label: "Created by",
    filters: [
      {
        id: "availability",
        type: "autocomplete",
        label: "ID",
        options: [
          { value: "1", label: "Available" },
          { value: "2", label: "Not available" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
];

export const OrganizationList: Organization[] = [
  {
    id: "ORG-1001",
    name: "Twilight IT Solutions",
    extraData: "",
    isActive: 1,
    createdAt: "04/05/2023",
    updatedAt: "04/05/2023",
    deletedAt: "04/05/2023",
  },
  {
    id: "ORG-1002",
    name: "Twilight Softwares",
    extraData: "",
    isActive: 1,
    createdAt: "04/05/2023",
    updatedAt: "04/05/2023",
    deletedAt: "04/05/2023",
  }
];


export const DepartmentList: Department[] = [
  {
    id: "DEPT-1001",
    name: "Computer Science",
    extraData: "",
    userId: "101",
    isActive: 1,
    createdAt: "04/05/2023",
    updatedAt: "04/05/2023",
    deletedAt: "04/05/2023",
  },
  {
    id: "DEPT-1002",
    name: "Cyber Security",
    extraData: "",
    userId: "101",
    isActive: 1,
    createdAt: "04/05/2023",
    updatedAt: "04/05/2023",
    deletedAt: "04/05/2023",
  },
  {
    id: "DEPT-1003",
    name: "Data Mining",
    extraData: "",
    userId: "102",
    isActive: 1,
    createdAt: "04/05/2023",
    updatedAt: "04/05/2023",
    deletedAt: "04/05/2023",
  },
];

export const LaboratoryList: readonly Laboratory[] = [
  {
    id: "LAB-1001",
    name: "Data Structure",
    departmentId: "DEPT-10001",
    extraData: "",
    userId: "101",
    isActive: 1,
    createdAt: "04/05/2023",
    updatedAt: "04/05/2023",
    deletedAt: "04/05/2023",
  },
  {
    id: "LAB-1002",
    name: "Data Structure",
    departmentId: "DEPT-10001",
    extraData: "",
    userId: "101",
    isActive: 1,
    createdAt: "04/05/2023",
    updatedAt: "04/05/2023",
    deletedAt: "04/05/2023",
  },
  {
    id: "LAB-1003",
    name: "Data Structure",
    departmentId: "DEPT-10001",
    extraData: "",
    userId: "101",
    isActive: 1,
    createdAt: "04/05/2023",
    updatedAt: "04/05/2023",
    deletedAt: "04/05/2023",
  },
  {
    id: "LAB-1004",
    name: "Data Warehouse",
    departmentId: "DEPT-10001",
    extraData: "",
    userId: "101",
    isActive: 1,
    createdAt: "04/05/2023",
    updatedAt: "04/05/2023",
    deletedAt: "04/05/2023",
  },
];

export const RunzHeaders: readonly RunzHead[] = [
  {
    id: "runNumber",
    label: "ID",
    filters: [
      {
        id: "assetNumber",
        type: "select",
        label: "Id",
        options: [
          { value: "ID1001", label: "ID1001" },
          { value: "ID1002", label: "ID1002" },
          { value: "ID1003", label: "ID1003" },
          { value: "ID1004", label: "ID1004" },
          { value: "ID1005", label: "ID1005" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "objective",
    label: "Objective Name",
    filters: [
      {
        id: "search",
        type: "textfield",
        label: "search",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "departmentId",
    label: "Department",
    filters: [
      {
        id: "dept",
        type: "select",
        label: "Department",
        options: [
          { value: "Computer science", label: "Computer science" },
          { value: "Cyber security", label: "Cyber security" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "laboratoryId",
    label: "Lab",
    filters: [
      {
        id: "lab",
        type: "select",
        label: "Lab",
        options: [
          { value: "Data mining", label: "Data mining" },
          { value: "Data warehouse", label: "Data warehouse" },
          { value: "OOPS", label: "OOPS" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },

  {
    id: "createdAt",
    label: "Created On",
    filters: [
      {
        id: "date",
        type: "date",
        label: "DD/MM/YYYY",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "dueDate",
    label: "Due Date",
    filters: [
      {
        id: "date",
        type: "date",
        label: "DD/MM/YYYY",
        options: [],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "isActive",
    label: "Status",
    filters: [
      {
        id: "status",
        type: "autocomplete",
        label: "-Select status-",
        options: [
          { value: "1", label: "New Task" },
          { value: "2", label: "Completed" },
          { value: "3", label: "Not Started" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
  {
    id: "extraDate",
    label: "Assigned By",
    filters: [
      {
        id: "status",
        type: "autocomplete",
        label: "-Select teacher-",
        options: [
          { value: "1", label: "User 1" },
          { value: "2", label: "User 2" },
          { value: "3", label: "User 3" },
        ],
      },
    ],
    sort: "asc",
    is_show: true,
  },
];
