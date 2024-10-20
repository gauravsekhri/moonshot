import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { getDay } from "date-fns";
import { IFilters } from "../../interfaces/Commoninterfaces";
import { Age, Gender } from "../../types/CommonTypes";
import { Filter } from "../../enums/filterEnum";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface IfilterBar {
  onFilterChange: (val: IFilters) => void;
  filters: IFilters;
}

const FilterBar = ({ onFilterChange, filters }: IfilterBar) => {
  const [isCopied, setIsCopied] = useState(false);

  const [dateRange, setDateRange] = useState<
    [Date | undefined, Date | undefined]
  >([
    new Date("2022-10-03T18:30:00.000Z"),
    new Date("2022-10-28T18:30:00.000Z"),
  ]);

  const [startDate, endDate] = dateRange;

  const minDate = new Date(2022, 9, 4);
  const maxDate = new Date(2022, 9, 29);

  // const [filters, setFilters] = useState<IFilters>({
  //   startDate: startDate ?? "",
  //   endDate: endDate ?? "",
  //   gender: Filter.Male,
  //   age: Filter.Age_15_25,
  //   category: "a",
  // });

  // const finalFilters: IFilters | any = {
  //   startDate: startDate ?? "",
  //   endDate: endDate ?? "",
  //   gender: Filter.Male,
  //   age: Filter.Age_15_25,
  // };

  const handleDateChange = (update: [Date | null, Date | null]) => {
    setDateRange([update[0] ?? undefined, update[1] ?? undefined]);

    if (update[0] && update[1]) {
      // setFilters({
      //   ...filters,
      //   startDate: update?.[0] ?? "",
      //   endDate: update?.[1] ?? "",
      // });

      // finalFilters.startDate = update?.[0] ?? "";
      // finalFilters.endDate = update?.[1] ?? "";
      onFilterChange({
        ...filters,
        startDate: update?.[0] ?? "",
        endDate: update?.[1] ?? "",
      });
      setIsCopied(false);
    }
  };

  const handleGenderChange = (value: Gender) => {
    onFilterChange({ ...filters, gender: value });
    setIsCopied(false);
  };

  const handleAgeChange = (value: Age) => {
    onFilterChange({ ...filters, age: value });
    setIsCopied(false);
  };

  const params = new URLSearchParams();
  params.set("age", filters.age);
  params.set("gender", filters.gender);
  params.set("startDate", String(filters.startDate));
  params.set("endDate", String(filters.endDate));
  params.set("category", filters.category ?? "a");

  const finalUrl = `http://localhost:3000/dashboard?${params.toString()}`;

  console.log(filters, "filterbar");

  return (
    <>
      <div className="filter_bar">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => handleDateChange(update)}
          withPortal
          // includeDates={availableDates}
          dateFormat="dd-MM-yyyy"
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Select dates"
          className="date_picker"
        />

        <select
          id="age"
          className="filter_dd"
          onChange={(e) => handleAgeChange(e.target.value)}
          value={filters.age}
        >
          <option value={Filter.Age_15_25}>15-25</option>
          <option value={Filter.Age_25}>{`>25`}</option>
        </select>

        <select
          id="gender"
          className="filter_dd"
          onChange={(e) => handleGenderChange(e.target.value)}
          value={filters.gender}
        >
          <option value={Filter.Male}>Male</option>
          <option value={Filter.Female}>Female</option>
        </select>

        <CopyToClipboard text={finalUrl} onCopy={() => setIsCopied(true)}>
          <div className="copy-url">{isCopied ? "URL Copied" : "Copy URL"}</div>
        </CopyToClipboard>
      </div>
    </>
  );
};

export default FilterBar;
