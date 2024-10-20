import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";

import axios from "axios";
import FilterBar from "../FilterBar";
import { IFilters } from "../../interfaces/Commoninterfaces";
import { Filter } from "../../enums/filterEnum";
import { CategoryKey } from "../../types/CommonTypes";
import request from "../../utils/ApiRequest";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [barsData, setBarsData] = useState<number[]>([]);
  const [linesData, setLinesData] = useState<[]>([]);
  const [filters, setFilters] = useState<IFilters>({
    age: Filter.Age_15_25,
    endDate: "2022-10-28T18:30:00.000Z",
    gender: Filter.Male,
    startDate: "2022-10-03T18:30:00.000Z",
    category: "a",
  });

  const fetchData = async (filters: IFilters) => {
    const { age, gender, startDate, endDate } = filters;

    const paramUrl = `?age=${age}&gender=${gender}&startDate=${startDate}&endDate=${endDate}`;
    const finalUrl = `/participants/filtered-data${paramUrl}`;

    const response = await request(finalUrl, "GET");

    if (response.success) {
      setBarsData(response?.data ?? []);
    }
  };

  const singleData = async (filters: IFilters) => {
    const { age, gender, startDate, endDate, category } = filters;

    const paramUrl = `?age=${age}&gender=${gender}&startDate=${startDate}&endDate=${endDate}&category=${category}`;
    const finalUrl = `/participants/category-data${paramUrl}`;

    const response = await request(finalUrl, "GET");

    if (response.success) {
      setLinesData(response?.data ?? []);
    }
  };

  useEffect(() => {
    const paramFilters = {
      age: searchParams.get("age") ?? Filter.Age_15_25,
      category: searchParams.get("category") ?? "a",
      endDate: searchParams.get("endDate") ?? "2022-10-28T18:30:00.000Z",
      gender: searchParams.get("gender") ?? Filter.Male,
      startDate: searchParams.get("startDate") ?? "2022-10-03T18:30:00.000Z",
    };

    setFilters(paramFilters);
    fetchData(paramFilters);
    singleData(paramFilters);
  }, [searchParams]);

  const handleFilterChange = (payload: IFilters) => {
    const updatedFilters = { ...payload, category: filters.category };

    fetchData(updatedFilters);
    singleData(updatedFilters);
    setFilters(updatedFilters);
  };

  const handleBarClick = (key: CategoryKey | any) => {
    let lowerKey = key?.toLowerCase() ?? "";

    const updatedFilters = {
      ...filters,
      category: lowerKey ?? "a",
    };

    singleData(updatedFilters);
    setFilters(updatedFilters);
  };

  return (
    <>
      <Navbar />

      <div className="contents_cont">
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        <div className="main_charts_cont">
          <BarChart data={barsData} onBarClick={handleBarClick} />
          <LineChart data={linesData} selectedKey={filters.category} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
