## GSBot

**GSBot** is an [Apps Script](https://www.google.com/script/start/) powered [Google Spreadsheet](https://www.google.com/sheets/about/) **Bot** which can screate submissions in spreadsheets and send webhook notifications for [Hangouts Chat Rooms](https://gsuite.google.com/products/chat/) and  [Slack](https://slack.com/intl/en-in/).
<br/>

## Getting Started

### Installation

* Create a new Google SpreadSheet
* Assign column names for each  field we’ll be collecting.(Place the names of each field in row 1.)
* Go to the **Tools** menu and select **Script editor** from the dropdown.
* Delete the code in `Code.gs` from the script editor
* Click on the `Untitled project` project name if you want to  rename your project.
* Copy and paste the [code](Code.gs) into the script editor
* Save. Then go to **Run** and click **setup**
* You might be asked to give Google Scripts authorisation to use your Google account.
* Once you’ve given your authorization, go to the **Publish** menu and select **Deploy as web app.**
* You **must** `execute the app as yourself` and you **must** give `Anyone, even anonymous` access to the app.
* Click on **Deploy** and save your web app URL for later
* Close the Script editor window

### Usage
Now all you have to do is make a `GET request` to the we app URL we saved before , with the data ( with the field names ) you wanna save.

If you’re struggling to access parameters or properly pass data, try attaching them to the end of the url instead (Paste the URL in your web browser to test it out.):  

    https://script.google.com/macros…/exec?firstName=Shubh&lastName=Khare
Where firstName and lastName are column names in row 1 of our spreadSheet we set up earlier, and Shubh and Khare are data we want to save in our spreadsheet.


### Notifications
**Uncomment** the part in `Code.gs` which is labelled as `Enable notification feature here`

You also have to `set slackWebhook and googleChatWebhook` to your webhooks.
<br/>
 **How to get webhooks :-**
 [Slack](https://slack.com/intl/en-in/help/articles/115005265063-Incoming-webhooks-for-Slack)          
 [Google chat](https://developers.google.com/hangouts/chat/quickstart/incoming-bot-node)
