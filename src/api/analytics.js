export const fetchAdmissionAnalytics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          totalApplicants: 1240,
          verifiedApplicants: 820,
          rejectedApplicants: 180,

          applicationsPerProgram: [
            { program: 'B.Tech', count: 450 },
            { program: 'MBA', count: 320 },
            { program: 'MCA', count: 210 },
            { program: 'B.Sc', count: 260 },
            { program: 'B.Com', count: 340 },
            { program: 'B.Ed', count: 200 },
            { program: 'BCA', count: 360 },
            { program: 'M.Tech', count: 100 },
            { program: 'M.Com', count: 290 },
            { program: 'M.Sc', count: 270 },
          ],

          applicationTrends: [
            { date: '2025-01-01', count: 120 },
            { date: '2025-02-03', count: 180 },
            { date: '2025-03-05', count: 260 },
            { date: '2025-04-07', count: 300 },
            { date: '2025-05-10', count: 90 },
            { date: '2025-06-12', count: 280 },
            { date: '2025-07-15', count: 520 },
            { date: '2025-08-18', count: 600 },
            { date: '2025-09-20', count: 680 },
            { date: '2025-10-22', count: 740 },
            { date: '2025-11-25', count: 820 },
            { date: '2025-06-30', count: 980 },
            { date: '2025-08-02', count: 150 },
            { date: '2025-09-05', count: 100 },
            { date: '2025-12-31', count: 1600 },
          ],
        },
      });
    }, 2000);
  });
};
