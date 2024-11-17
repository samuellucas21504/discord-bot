import { StockService } from "@services/stock-service.js";
import { CronJob } from "cron";

export class CRON {
  public static schedule() {
    this.scheduleStocks();
  }

  private static scheduleStocks() {
    const stockService = new StockService();

    stockService.sendStockReports();

    new CronJob(
      '00 18 * * *',
      () => {
        stockService.sendStockReports();
      },
      null,
      true,
    );
  }
}
