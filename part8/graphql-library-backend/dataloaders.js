import DataLoader from "dataloader";
import Book from "./models/booksModel.js";

const bookCountLoader = new DataLoader(async (authorIds) => {
  const counts = await Book.aggregate([
    { $match: { author: { $in: authorIds } } },
    { $group: { _id: "$author", count: { $sum: 1 } } },
  ]);
  const countMap = {};
  counts.forEach((c) => {
    countMap[c._id.toString()] = c.count;
  });
  return authorIds.map((id) => countMap[id.toString()] || 0);
});

export default {
  bookCountLoader,
};
