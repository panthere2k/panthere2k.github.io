---
title: Monitor scripts
pcx_content_type: how-to
weight: 2
meta:
  title: Monitor scripts on your site
---

# Monitor scripts on your site

Once you have [activated Page Shield](/page-shield/get-started/), review the Active Scripts dashboard to see which [active scripts](/page-shield/reference/script-statuses/) are running on your domain.

If you see unexpected scripts on the dashboard, check them for signs of malicious activity.

The All Reported Scripts dashboard displays all the scripts, including infrequent or inactive scripts, reported in the last 30 days. After 30 days without any report, Page Shield will delete information about a previously reported script, and the script will no longer appear in any of the dashboards.

Depending on your Cloudflare plan, you may also be able to:

- [View the details of each script](#view-script-details)
- [Review scripts considered malicious](/page-shield/use-dashboard/review-malicious-scripts/)
- [Review changed scripts](/page-shield/use-dashboard/review-changed-scripts/)

## Use the Active Scripts dashboard

To review the active scripts monitored by Page Shield:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2.  Go to **Security** > **Page Shield**.
3.  Under **Active Scripts**, review the active scripts for your domain.
4.  To filter scripts, use the following options:

    - **Search scripts**: Search scripts by their URL.
    - **Search hosts**: Look for scripts appearing on specific hostnames.
    - **Search pages** (requires a Business or Enterprise plan): Look for scripts appearing in a specific page. Searches the page where the first script occurred and the latest occurrences list.

To review all scripts reported in your domain in the last 30 days, select **View all scripts**.

If you recently activated Page Shield, you may see a delay in reporting.

## Review all reported scripts

Use the All Reported Scripts dashboard to review all scripts reported in your domain in the last 30 days, including infrequent or inactive scripts.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** > **Page Shield** > **Script monitor**.
3. Under **Active scripts**, select **View all scripts**.
4. Review the information displayed in the **All reported scripts** dashboard.

The All Reported Scripts dashboard allows you to filter the displayed scripts using different criteria and to print a report with the displayed scripts.

## View script details

{{<Aside type="note">}}

Only available to customers on Business and Enterprise plans.

{{</Aside>}}

You can check the details of each script displayed in the dashboard, including the following fields:

- **Last seen**: How long ago the script was last detected (in the last 30 days).
- **First seen at**: The date and time when the script was first detected.
- **Page URLs**: The most recent pages where the script was detected (up to ten pages).
- **First page URL**: The page where the script was first detected.

The information above helps you track how and how many times a script appeared in your domain and which pages have recently loaded the script.
