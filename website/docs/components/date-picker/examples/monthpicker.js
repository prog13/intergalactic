import React, { useState } from 'react';
import { MonthPicker, MonthRangePicker } from '@semcore/date-picker';
import { Box, Flex } from '@semcore/flex-box';

function Demo() {
  const [value, setValue] = useState(new Date());
  const [valueRange, setValueRange] = useState([]);

  return (
    <Flex>
      <Box>
        <MonthPicker value={value} onChange={(date) => setValue(date)} />
      </Box>
      <Box ml={5}>
        <MonthRangePicker value={valueRange} onChange={(date) => setValueRange(date)} />
      </Box>
    </Flex>
  );
}

export default Demo;
