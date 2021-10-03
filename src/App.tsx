import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, CssBaseline, Divider, Container, Grid, Button, TextField, IconButton } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DeleteIcon from '@mui/icons-material/Delete';
// import { jsPDF } from "jspdf";
import Navigation from "./components/navigation"
import PaperContainer from "./components/papercontainer"
import * as store from './store'
import { ActionItems, PostmortemReport, Timeline } from "./types"


function generateMarkdown(data: PostmortemReport) {
  let md = [
    `# Postmortem ${data.meta.reportTitle}`,
    `Date: ${data.meta.date}`,
    ``,
    `---`,
    ``,
    `### Status`,
    ``,
    `${data.meta.status}`,
    ``,
    `### Authors`,
    ``,
    `${data.meta.authors}`,
    ``,
    `### Summary`,
    ``,
    `${data.meta.summary}`,
    ``,
    `### Impact`,
    ``,
    `${data.meta.impact}`,
    ``,
    `### Root Causes`,
    ``,
    `${data.meta.rootCauses}`,
    ``,
    `### Trigger`,
    ``,
    `${data.meta.trigger}`,
    ``,
    `### Resolution`,
    ``,
    `${data.meta.resolution}`,
    ``,
    `### Detection`,
    ``,
    `${data.meta.detection}`,
    ``,
    `---`,
    ``,
    `## Lessons Learned`,
    ``,
    `### What went well`,
    ``,
    data.lessonsLearned.whatWentWell,
    ``,
    `### What went wrong`,
    ``,
    data.lessonsLearned.whatWentWrong,
    ``,
    `### Where we got lucky`,
    ``,
    data.lessonsLearned.whereWeGotLucky,
    ``,
    `---`,
    ``,
    `## Timelined`,
    ``,
    // eslint-disable-next-line
    ...data.timeline.map(t => t.time + " **" + t.person + "**" + "\n```\n" + t.message + "\n```\n"),
    ``,
    `---`,
    ``,
    `## Support Information`,
    ``,
    data.supportInformation,
  ]
  return md.join("\n")
}

// function generatePDF(data: PostmortemReport) {
//   const doc = new jsPDF();

//   let textX = 10
//   let textY = 10
//   doc.setFontSize(20)
//   doc.text("Postmortem Report", textX, textY);

//   doc.setFontSize(10)
//   textY += 10
//   doc.text("Date " + data.meta.date, textX, textY);

//   textY += 10
//   doc.text("Status: " + data.meta.status, textX, textY);

//   textY += 10
//   doc.text("Authors: " + data.meta.authors, textX, textY);

//   textY += 10
//   doc.text("Support Information:" + data.meta.authors, textX, textY);

//   textY += 10
//   doc.text(data.supportInformation, textX, textY);

//   doc.save("a4.pdf");
// }

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>(store.getUIMode);
  const theme = React.useMemo(() =>
    createTheme({ palette: { mode } }),
    [mode],
  );

  // meta data
  const [reportTitle, setReportTitle] = useState<string>(store.getTitle)
  const [date, setDate] = useState<Date | null>(new Date())
  const [status, setStatus] = useState<string>(store.getStatus)
  const [authors, setAuthors] = useState<string>(store.getAuthors)
  const [summary, setSummary] = useState<string>(store.getSummary)
  const [impact, setImpact] = useState<string>(store.getImpact)
  const [rootCauses, setRootCauses] = useState<string>(store.getRootCauses)
  const [trigger, setTrigger] = useState<string>(store.getTrigger)
  const [resolution, setResolution] = useState<string>(store.getResolution)
  const [detection, setDetection] = useState<string>(store.getDetection)
  // action items
  const [actionItems, setActionitems] = useState<ActionItems>(store.getActionItems)
  // lessons learned
  const [whatWentWell, setWhatWentWell] = useState<string>(store.getWhatWentWell)
  const [whatWentWrong, setWhatWentWrong] = useState<string>(store.getWhatWentWrong)
  const [whereWeGotLucky, setWhereWeGotLucky] = useState<string>(store.getWhereWeGotLucky)
  // timeline
  const [timeline, setTimeline] = useState<Timeline>(store.getTimeline)
  // support information
  const [supportInformation, setSupportInformation] = useState<string>(store.getSupportInformation)

  // personList used for autocomplete
  // const [personList, setPersonList] = useState<Array<string>>([])

  const toggleColorMode = () => {
    if (mode === 'dark') {
      setMode("light")
      store.setUIMode("light")
    } else {
      setMode('dark')
      store.setUIMode("dark")
    }
  }

  const generateJSON = () => {
    const data: PostmortemReport = {
      meta: {
        reportTitle,
        date,
        status,
        authors,
        summary,
        impact,
        rootCauses,
        trigger,
        resolution,
        detection,
      },
      lessonsLearned: {
        whatWentWell,
        whatWentWrong,
        whereWeGotLucky,
      },
      timeline,
      supportInformation,
    }
    return data
  }

  const handleExportJSON = () => {
    const data = generateJSON()
    let tab = window.open('about:blank', '_blank');
    tab?.document.write("<pre>" + JSON.stringify(data, null, "  ") + "</pre>");
    tab?.document.close();
  };

  const handleExportMarkdown = () => {
    const data = generateJSON()
    const md = generateMarkdown(data)
    let tab = window.open('about:blank', '_blank');
    tab?.document.write("<pre>" + md + "</pre>");
    tab?.document.close();
  };

  // const handleExportPDF = () => {
  //   console.log("export pdf");
  //   const data = generateJSON()
  //   generatePDF(data)
  // };

  const handleSettingsClearReport = () => {
    store.clearAll()
    setReportTitle("")
    setDate(new Date())
    setStatus("")
    setAuthors("")
    setSummary("")
    setImpact("")
    setRootCauses("")
    setTrigger("")
    setResolution("")
    setDetection("")
    setActionitems([])
    setWhatWentWell("")
    setWhatWentWrong("")
    setWhereWeGotLucky("")
    setTimeline([])
    setSupportInformation("")
  }

  const getUniquePeople = () => {
    return Array.from(new Set(timeline.map(i => i.person)))
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />

        <Navigation
          onExportJSON={handleExportJSON}
          onExportMarkdown={handleExportMarkdown}
          // onExportPDF={handleExportPDF}
          onClearReport={handleSettingsClearReport}
          colorMode={theme.palette.mode}
          toggleColorMode={toggleColorMode}
        />

        <Container component="main" maxWidth="xl" sx={{ mb: 2 }}>
          <PaperContainer title="Report">
            <Grid item md={9} sm={8} xs={12}>
              <TextField
                id="report_title"
                name="report_title"
                label="Title"
                fullWidth
                multiline
                value={reportTitle}
                onChange={e => {
                  setReportTitle(e.target.value)
                  store.setTitle(e.target.value)
                }}
              />
            </Grid>

            <Grid item md={3} sm={4} xs={12}>
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={(newValue: Date | null) => {
                  setDate(newValue);
                }}

                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="authors"
                name="authors"
                label="Authors"
                fullWidth
                multiline
                value={authors}
                onChange={e => {
                  setAuthors(e.target.value)
                  store.setAuthors(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="status"
                name="status"
                label="Status"
                fullWidth
                multiline
                value={status}
                onChange={e => {
                  setStatus(e.target.value)
                  store.setStatus(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="summary"
                name="summary"
                label="Summary"
                fullWidth
                multiline
                value={summary}
                onChange={e => {
                  setSummary(e.target.value)
                  store.setSummary(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="impact"
                name="impact"
                label="Impact"
                fullWidth
                multiline
                value={impact}
                onChange={e => {
                  setImpact(e.target.value)
                  store.setImpact(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="root_causes"
                name="root_causes"
                label="Root Causes"
                fullWidth
                multiline
                value={rootCauses}
                onChange={e => {
                  setRootCauses(e.target.value)
                  store.setRootCauses(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="trigger"
                name="trigger"
                label="Trigger"
                fullWidth
                multiline
                value={trigger}
                onChange={e => {
                  setTrigger(e.target.value)
                  store.setTrigger(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="resolution"
                name="resolution"
                label="Resolution"
                fullWidth
                multiline
                value={resolution}
                onChange={e => {
                  setResolution(e.target.value)
                  store.setResolution(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="detection"
                name="detection"
                label="Detection"
                fullWidth
                multiline
                value={detection}
                onChange={e => {
                  setDetection(e.target.value)
                  store.setDetection(e.target.value)
                }}
              />
            </Grid>
          </PaperContainer>

          <PaperContainer title="Action Items">
            {actionItems.map((row, index) => (
              <>
                <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                  <TextField
                    id="actionItem"
                    name="actionItem"
                    label="Action Item"
                    fullWidth
                    multiline
                    value={row.actionItem}
                    onChange={(e) => {
                      let tmp = actionItems
                      tmp[index].actionItem = e.target.value
                      setActionitems([...tmp])
                    }}
                  />
                </Grid>

                <Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
                  <Autocomplete
                    id="type"
                    freeSolo
                    options={["process", "prevent", "mitigate", "others"]}
                    renderInput={(params) => <TextField {...params} fullWidth value={row.type} label="Type"
                      onChange={e => {
                        let tmp = actionItems
                        tmp[index].type = e.target.value
                        setActionitems([...tmp])
                      }} />}
                  />
                </Grid>
                <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                  <Autocomplete
                    id="owner"
                    freeSolo
                    options={getUniquePeople()}
                    renderInput={(params) => <TextField {...params} fullWidth value={row.owner} label="Owner"
                      onChange={e => {
                        let tmp = actionItems
                        tmp[index].owner = e.target.value
                        setActionitems([...tmp])
                      }} />}
                  />
                </Grid>
                <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
                  <TextField
                    id="bug"
                    name="bug"
                    label="Bug"
                    fullWidth
                    multiline
                    value={row.bug}
                    onChange={(e) => {
                      let tmp = actionItems
                      tmp[index].bug = e.target.value
                      setActionitems([...tmp])
                    }}
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <IconButton onClick={() => {
                    let tmp = actionItems
                    tmp.splice(index, 1)
                    setActionitems([...tmp])
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </>
            ))}

            <Grid item xs={11} sm={11} md={11} lg={11} xl={11} >
              <Button variant="contained" color="primary" fullWidth onClick={() => {
                setActionitems([...actionItems, { actionItem: "", type: "", owner: "", bug: "" }])
              }}>
                Add Action Item
              </Button>
            </Grid>
          </PaperContainer>

          <PaperContainer title="Lessons Learned">
            <Grid item xs={12}>
              <TextField
                id="what_went_well"
                name="what_went_well"
                label="What went well"
                fullWidth
                multiline
                minRows={3}
                value={whatWentWell}
                onChange={e => {
                  setWhatWentWell(e.target.value)
                  store.setWhatWentWell(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="what_went_wrong"
                name="what_went_wrong"
                label="What went wrong"
                fullWidth
                multiline
                minRows={3}
                value={whatWentWrong}
                onChange={e => {
                  setWhatWentWrong(e.target.value)
                  store.setWhatWentWrong(e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="where_we_got_lucky"
                name="where_we_got_lucky"
                label="Where we got lucky"
                fullWidth
                multiline
                minRows={3}
                value={whereWeGotLucky}
                onChange={e => {
                  setWhereWeGotLucky(e.target.value)
                  store.setWhereWeGotLucky(e.target.value)
                }}
              />
            </Grid>
          </PaperContainer>

          <PaperContainer title="Timeline">
            <TimelineTable
              data={timeline}
              personList={getUniquePeople()}
              onChange={(data => {
                setTimeline(data)
                store.setTimeline(data)
              })}
            />
          </PaperContainer>

          <PaperContainer title="Support Information">
            <Grid item xs={12}>
              <TextField
                id="support_information"
                name="support_information"
                label="Useful information, links, logs, screenshots, graphs, IRC logs, IM logs, etc."
                fullWidth
                multiline
                minRows={10}
                value={supportInformation}
                onChange={e => {
                  setSupportInformation(e.target.value)
                  store.setSupportInformation(e.target.value)
                }}
              />
            </Grid>
          </PaperContainer>

        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

type TimelineProps = {
  data: Timeline;
  onChange: (data: Timeline) => void;
  personList: Array<string>;
}

const TimelineTable = (props: TimelineProps) => {
  const handleAddTimelineItem = () => {
    const currentTime = new Date()
    const hours = currentTime.getHours()
    const hoursString = hours <= 9 ? "0" + hours : hours + ""
    const minutes = currentTime.getMinutes()
    const minutesString = minutes <= 9 ? "0" + minutes : minutes + ""
    const tmp = {
      time: hoursString + ":" + minutesString,
      person: "",
      message: ""
    }
    props.onChange([...props.data, tmp])
  }

  return (
    <>
      {props.data.map((item, index) => (
        <>
          <Grid item xs={3} sm={2} md={2} lg={1} xl={1}>
            <TextField
              id="time"
              name="time"
              label="Time"
              fullWidth
              value={item.time}
              onChange={e => {
                let tmp = props.data
                tmp[index].time = e.target.value
                props.onChange([...tmp])
              }}
            />
          </Grid>
          <Grid item xs={8} sm={9} md={3} lg={2} xl={2}>
            <Autocomplete
              id="person"
              freeSolo
              options={props.personList}
              value={item.person}
              renderInput={(params) => <TextField {...params}
                name="person"
                label="Person / System"
                fullWidth
                value={item.person}
                onChange={e => {
                  let tmp = props.data
                  tmp[index].person = e.target.value
                  props.onChange([...tmp])
                }} />}
            />
          </Grid>
          <Grid item xs={11} sm={11} md={6} lg={8} xl={8}>
            <TextField
              id="message"
              name="message"
              label="Message"
              fullWidth
              multiline
              value={item.message}
              onChange={e => {
                let tmp = props.data
                tmp[index].message = e.target.value
                props.onChange([...tmp])
              }}
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <IconButton sx={{ float: "right" }} onClick={() => {
              let tmp = props.data
              tmp.splice(index, 1)
              props.onChange([...tmp])
            }}>
              <DeleteIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
        </>
      ))}

      <Grid item xs={11} sm={11} md={11} lg={11} >
        <Button variant="contained" color="primary" fullWidth onClick={handleAddTimelineItem}>
          Add
        </Button>
      </Grid>
    </>
  )
}

export default App;
