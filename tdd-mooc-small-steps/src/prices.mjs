import "./polyfills.mjs";
import express from "express";

// Refactor the following code to get rid of the legacy Date class.
// Use Temporal.PlainDate instead. See /test/date_conversion.spec.mjs for examples.

function createApp(database) {
  const app = express();

  app.put("/prices", (req, res) => {
    const liftPassCost = req.query.cost;
    const liftPassType = req.query.type;
    database.setBasePrice(liftPassType, liftPassCost);
    res.json();
  });

  app.get("/prices", (req, res) => {
    const age = req.query.age;
    const type = req.query.type;
    const baseCost = database.findBasePriceByType(type).cost;
    const temporalDate = parseTemporalDate(req.query.date);
    const cost = calculateCost(age, type, temporalDate, baseCost);
    res.json({ cost });
  });

  function parseDate(dateString) {
    if (dateString) {
    }
  }

  function parseTemporalDate(dateString) {
    if (dateString) {
      return Temporal.PlainDate.from(dateString);
    }
  };

  function calculateCost(age, type, temporalDate, baseCost) {
    if (type === "night") {
      return calculateCostForNightTicket(age, baseCost);
    } else {
      return calculateCostForDayTicket(age, temporalDate, baseCost);
    }
  }

  function calculateCostForNightTicket(age, baseCost) {
    if (age === undefined) {
      return 0;
    }
    if (age < 6) {
      return 0;
    }
    if (age > 64) {
      return Math.ceil(baseCost * 0.4);
    }
    return baseCost;
  }

  function calculateCostForDayTicket(age, temporalDate, baseCost) {
    let reduction = calculateReduction(temporalDate);
    if (age === undefined) {
      return Math.ceil(baseCost * (1 - reduction / 100));
    }
    if (age < 6) {
      return 0;
    }
    if (age < 15) {
      return Math.ceil(baseCost * 0.7);
    }
    if (age > 64) {
      return Math.ceil(baseCost * 0.75 * (1 - reduction / 100));
    }
    return Math.ceil(baseCost * (1 - reduction / 100));
  }

  function calculateReduction(temporalDate) {
    let reduction = 0;
    if (temporalDate && isMonday(temporalDate) && !isHoliday(temporalDate)) {
      reduction = 35;
    }
    return reduction;
  }

  function isMonday(temporalDate) {
    return temporalDate.dayOfWeek === 1;
  }

  function isHoliday(temporalDate) {
    const holidays = database.getHolidays();
    for (let row of holidays) {
      let temporalHoliday = Temporal.PlainDate.from(row.holiday);
      if (
        temporalDate &&
        temporalDate.year === temporalHoliday.year &&
        temporalDate.month === temporalHoliday.month &&
        temporalDate.day === temporalHoliday.day
      ) {
        return true;
      }
    }
    return false;
  }

  return app;
}

export { createApp };
