SELECT
    SUM(CASE WHEN Type = 1 THEN Amount ELSE 0 END) AS TotalIncome,
    SUM(CASE WHEN Type = 2 THEN Amount ELSE 0 END) AS TotalExpense,
    SUM(CASE WHEN Type = 1 THEN Amount ELSE -Amount END) AS Balance
FROM Transactions
WHERE UserId = @UserId
  AND [Date] >= @StartDate
  AND [Date] <= @EndDate
