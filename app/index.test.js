import { lineHandler } from "./index";
// only test line handler as unit test
describe("line handler should process 3 types of lines", () => {
  let readStatus = {};

  beforeEach(() => {
    readStatus.data = {};
  });

  describe("lawn info test", () => {
    it("lawn info setting", () => {
      readStatus.lineCount = 0;
      lineHandler(readStatus)("4 6");
      expect(readStatus.data).toHaveProperty("lawn");
    });
  });

  describe("mower pos test", () => {
    beforeEach(() => {
      readStatus.lineCount = 1;
      readStatus.data = {
        lawn: {
          startPoint: [0, 0],
          endPoint: [5, 5]
        }
      };
    });
    it("mower info setting outbound should not emit to readStatus.data", () => {
      lineHandler(readStatus)("7 4 E");
      expect(readStatus.data).not.toHaveProperty("mower");
    });

    it("mower info setting with correct lawnInfo should return an expected object", () => {
      lineHandler(readStatus)("3 4 E");
      expect(readStatus.data.mower).toEqual({
        key: readStatus.lineCount + 1,
        initPos: [3, 4, "E"]
      });
    });
  });

  describe("mower commands test", () => {
    beforeEach(() => {
      readStatus = {
        lineCount: 2,
        data: {
          mower: {
            key: 2,
            initPos: [3, 3, "N"]
          }
        }
      };
    });
    it("mower commands setting", () => {
      const cmds = "hhh";
      lineHandler(readStatus)(cmds);
      expect(readStatus.data).toEqual({
        mower: {
          key: 2,
          initPos: [3, 3, "N"]
        }
      });
    });
  });
});
