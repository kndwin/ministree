import { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
  addMonths,
  subMonths,
} from 'date-fns';
import { tw, Box, Text, Button } from '@minis/ui/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Layout } from 'apps/web-nextjs/features/layout';

const t = {
  welcome: 'Roster',
};

export default function RosterPage() {
  return (
    <Layout>
      <Layout.NavSidebar />

      <Box tw="flex-1 flex flex-col">
        <Layout.Header
          leftSection={
            <Box center tw="bg-stone-300 px-2 py-1 rounded dark:bg-stone-700">
              <Text b>{t.welcome}</Text>
            </Box>
          }
        />
        <Layout.Main>
          <Calendar />
        </Layout.Main>
      </Box>
    </Layout>
  );
}

const MAX_DAYS_IN_MONTH_VIEW = 7 * 5;
const monthlyHeaders = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const Calendar = () => {
  const [monthStart, setMonthStart] = useState(startOfMonth(new Date()));
  let daysInCurrentMonth = eachDayOfInterval({
    start: monthStart,
    end: endOfMonth(monthStart),
  });
  const dayStartOfMonth = getDay(monthStart);
  const prependEmptyDays = Array.from(Array(dayStartOfMonth).keys());

  const daysInMonthAndEmpty = daysInCurrentMonth.length + dayStartOfMonth;

  const appendEmptyDays = Array.from(
    Array(
      daysInMonthAndEmpty > 35
        ? 42 - daysInMonthAndEmpty
        : 35 - daysInMonthAndEmpty
    ).keys()
  );

  return (
    <Box tw="w-full m-4">
      <Box tw="flex gap-4 items-center mb-4">
        <Button
          size="icon"
          color="light"
          onClick={() => setMonthStart(addMonths(monthStart, 1))}
        >
          <HiChevronLeft />
        </Button>
        <Text b tw="w-16">
          {format(monthStart, 'LLLL')}
        </Text>
        <Button
          size="icon"
          color="light"
          onClick={() => setMonthStart(subMonths(monthStart, 1))}
        >
          <HiChevronRight />
        </Button>
      </Box>
      <Box tw="border border-black grid grid-cols-7 w-full h-fit">
        {monthlyHeaders.map((day) => (
          <Box tw="w-full h-8 border border-stone-500 p-2 border-b-0">
            <Text b tw="">
              {day}
            </Text>
          </Box>
        ))}
      </Box>
      <Box tw="border border-black grid grid-cols-7 grid-rows-5 w-full h-fit border-t-0">
        {prependEmptyDays.map((index) => (
          <MonthlyDayBox />
        ))}
        {daysInCurrentMonth.map((date) => (
          <MonthlyDayBox day={date} />
        ))}
        {appendEmptyDays.map((index) => (
          <MonthlyDayBox />
        ))}
      </Box>
    </Box>
  );
};

const MonthlyDayBox = ({ day }: { day?: Date }) => {
  return (
    <Box tw="w-full h-20 border border-stone-500 p-2">
      {Boolean(day) && (
        <Text b tw="">
          {format(day, 'do')}
        </Text>
      )}
    </Box>
  );
};
