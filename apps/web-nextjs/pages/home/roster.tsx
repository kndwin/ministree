import { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
  addMonths,
  subMonths,
  isToday,
} from 'date-fns';
import { styled, Box, Text, Button } from '@ui/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Layout, getLayout } from 'apps/web-nextjs/common/ui/layout';
import clsx from 'clsx';

const t = {
  welcome: 'Roster',
};

export default function RosterPage() {
  return (
    <Layout.Main>
      <Calendar />
    </Layout.Main>
  );
}
RosterPage.getLayout = getLayout;

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
      <StyledBorderedBox tw="grid grid-cols-7 w-full h-fit">
        {monthlyHeaders.map((day) => (
          <StyledBorderedBox key={day} tw="w-full h-8 p-2 border-b-0">
            <Text b tw="">
              {day}
            </Text>
          </StyledBorderedBox>
        ))}
      </StyledBorderedBox>
      <Box tw="grid grid-cols-7 grid-rows-5 w-full h-fit border-t-0">
        {prependEmptyDays.map((index) => (
          <MonthlyDayBox key={`prepend-${index}`} />
        ))}
        {daysInCurrentMonth.map((date) => (
          <MonthlyDayBox key={date.getUTCMilliseconds()} day={date} />
        ))}
        {appendEmptyDays.map((index) => (
          <MonthlyDayBox key={`append-${index}`} />
        ))}
      </Box>
    </Box>
  );
};

const StyledBorderedBox = styled(
  Box,
  'border border-stone-200 dark:border-stone-800'
);

const MonthlyDayBox = ({ day }: { day?: Date }) => {
  return (
    <StyledBorderedBox
      tw={['w-full h-20 p-2', !day && 'bg-stone-300 dark:bg-stone-700']}
    >
      {Boolean(day) && (
        <Text
          tw={[
            isToday(day) && 'text-stone-100 bg-rose-200 dark:text-stone-900',
            'w-fit rounded text-xs p-1 font-bold',
          ]}
        >
          {format(day, 'do')}
        </Text>
      )}
    </StyledBorderedBox>
  );
};
