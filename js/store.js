export const store = {
  currentFunds: 10000000,
  isFirstEdit: false,
  todayId: 1,
  dateList: [
    {
      date: new Date().toLocaleDateString(),
      id: "1",
    },
    {
      date: new Date("2000-01-10").toLocaleDateString(),
      id: "2",
    },
  ],
  detailList: {
    1: [
      {
        id: Date.now() + 1000,
        createAt: new Date(),
        description: "삼겹살",
        category: "식사",
        amount: 20000,
        fundsAtTheTime: 9978000,
      },
    ],
    2: [
      {
        id: Date.now(),
        createAt: new Date("2000-01-10 10:30"),
        description: "아이스 아메리카노",
        category: "카페",
        amount: 2000,
        fundsAtTheTime: 9998000,
      },
    ],
  },
};
