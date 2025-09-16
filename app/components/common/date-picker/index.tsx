/* eslint-disable */
// @ts-nocheck
"use client";
import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import { Calendar } from "../../ui/calendar";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";

interface CustomDatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  disabled?: boolean;
  muiDateStyle?: any;
}

import { ChevronDownIcon } from "lucide-react";

export function CustomDateTimePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          {label}
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-40 justify-between font-normal"
            >
              {value ? value.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              defaultMonth={value ?? undefined}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (!date) return;
                const merged = new Date(date);
                merged.setHours(
                  value?.getHours() ?? 0,
                  value?.getMinutes() ?? 0,
                  value?.getSeconds() ?? 0,
                  value?.getMilliseconds() ?? 0
                );
                onChange(merged);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={
            value ? value.toLocaleTimeString("en-GB", { hour12: false }) : ""
          }
          onChange={(e) => {
            const [hh, mm, ss = "0"] = e.target.value.split(":");
            const next = new Date(value ?? new Date());
            next.setHours(Number(hh), Number(mm), Number(ss), 0);
            onChange(next);
          }}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
