jest.mock('readline');
import { askQuestions } from './readCli';

it('test read line', async () => {
  expect.assertions(4);
  const readStatus = await askQuestions();
  expect(readStatus).toHaveProperty("data");
  expect(readStatus.data).toHaveProperty("inputSource", "cli input");
  expect(readStatus.data).toHaveProperty("lawn", {startPoint: [0,0], endPoint: [5, 5]});
  expect(readStatus.data).toHaveProperty("mower.initPos");
});
