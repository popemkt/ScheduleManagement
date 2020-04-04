export default database = {
  roles: [
    { RoleId: 1, Name: 'Employee' },
    { RoleId: 2, Name: 'Manager' },
  ],
  specialty: [
    { Id: 1, Name: 'Cashier' },
    { Id: 2, Name: 'Waiter'},
    { Id: 3, Name: ''}
  ],
  accounts: [
    {
      Id: 1,
      Username: 'manager',
      Password: 'manager',
      Fullname: 'Nguyen Gia Hoang',
      RoleId: 1,
    },
    {
      Id: 2,
      Username: 'emp',
      Password: 'emp',
      Fullname: 'Nguyen Dinh Phong',
      RoleId: 2,
    },
    {
      Id: 3,
      Username: 'emp1',
      Password: 'emp1',
      Fullname: 'Nguyen Tuan Anh',
      RoleId: 2,
    },
  ],
  schedule: [
    {Id: 1, Date: '2020-04-06', HourSlot: 8, EmpId: 2},
    {Id: 2, Date: '2020-04-06', HourSlot: 9, EmpId: 2},
    {Id: 3, Date: '2020-04-06', HourSlot: 10, EmpId: 2},
    {Id: 4, Date: '2020-04-06', HourSlot: 11, EmpId: 2},
    {Id: 5, Date: '2020-04-06', HourSlot: 13, EmpId: 2},
    {Id: 6, Date: '2020-04-06', HourSlot: 14, EmpId: 2},
    {Id: 7, Date: '2020-04-06', HourSlot: 15, EmpId: 2},
    {Id: 8, Date: '2020-04-06', HourSlot: 16, EmpId: 2},
  ],
  scheduleTemplate: [
    {Id: 1, Date: '2020-04-06', HourSlot: 8, NoOfEmp: 2, SpecialtyId: 1},
    {Id: 2, Date: '2020-04-06', HourSlot: 8, NoOfEmp: 2, SpecialtyId: 2},
    {Id: 3, Date: '2020-04-06', HourSlot: 9, NoOfEmp: 2, SpecialtyId: 1},
    {Id: 4, Date: '2020-04-06', HourSlot: 9, NoOfEmp: 2, SpecialtyId: 2},
    {Id: 5, Date: '2020-04-06', HourSlot: 10, NoOfEmp: 2, SpecialtyId: 1},
    {Id: 6, Date: '2020-04-06', HourSlot: 10, NoOfEmp: 2, SpecialtyId: 2},
    {Id: 7, Date: '2020-04-06', HourSlot: 11, NoOfEmp: 2, SpecialtyId: 1},
    {Id: 8, Date: '2020-04-06', HourSlot: 11, NoOfEmp: 2, SpecialtyId: 2},
    {Id: 9, Date: '2020-04-06', HourSlot: 13, NoOfEmp: 2, SpecialtyId: 1},
    {Id: 10, Date: '2020-04-06', HourSlot: 13, NoOfEmp: 2, SpecialtyId: 2},
    {Id: 11, Date: '2020-04-06', HourSlot: 14, NoOfEmp: 2, SpecialtyId: 1},
    {Id: 12, Date: '2020-04-06', HourSlot: 14, NoOfEmp: 2, SpecialtyId: 2},
    {Id: 13, Date: '2020-04-06', HourSlot: 15, NoOfEmp: 2, SpecialtyId: 1},
    {Id: 14, Date: '2020-04-06', HourSlot: 15, NoOfEmp: 2, SpecialtyId: 2},
    {Id: 15, Date: '2020-04-06', HourSlot: 16, NoOfEmp: 2, SpecialtyId: 1},
    {Id: 16, Date: '2020-04-06', HourSlot: 16, NoOfEmp: 2, SpecialtyId: 2},
    {Id: 17, Date: '2020-04-07', HourSlot: 8, NoOfEmp: 2, SpecialtyId: 1},
    {Id: 18, Date: '2020-04-07', HourSlot: 8, NoOfEmp: 2, SpecialtyId: 2},
    {Id: 19, Date: '2020-04-07', HourSlot: 9, NoOfEmp: 2, SpecialtyId: 1},
    {Id: 20, Date: '2020-04-07', HourSlot: 9, NoOfEmp: 2, SpecialtyId: 2},
    {Id: 21, Date: '2020-04-07', HourSlot: 10, NoOfEmp: 2, SpecialtyId: 1},
    {Id: 22, Date: '2020-04-07', HourSlot: 10, NoOfEmp: 2, SpecialtyId: 2},
    {Id: 23, Date: '2020-04-07', HourSlot: 11, NoOfEmp: 2, SpecialtyId: 1},
    {Id: 24, Date: '2020-04-07', HourSlot: 11, NoOfEmp: 2, SpecialtyId: 2},
  ]
};
