
const [openFromDialogAddCourses, setOpenFromDialogAddCourses] = React.useState(false);
const [openFromDialogEditCoursesData, setOpenFromDialogEditCoursesData] = React.useState(false);
const [openFromDialogDeleteCourses, setOpenFromDialogDeleteCourses] = React.useState(false);
const [openFromDialogAddUnitSubject, setOpenFromDialogAddUnitSubject] = React.useState(false);
const [openFromDialogEditUnitSubjectData, setOpenFromDialogEditUnitSubjectData] = React.useState(false);
const [openFromDialogDeleteUnitSubject, setOpenFromDialogDeleteUnitSubject] = React.useState(false);
const [openFromDialogAddLectures, setOpenFromDialogAddLectures] = React.useState(false);
const [openFromDialogEditLecturesData, setOpenFromDialogEditLecturesData] = React.useState(false);
const [openFromDialogDeleteLectures, setOpenFromDialogDeleteLectures] = React.useState(false);

const openFormDialogFun = (data) => {
    if (data === "Add Courses") setOpenFromDialogAddCourses(true)
    if (data === "Edit Courses Data") setOpenFromDialogEditCoursesData(true)
    if (data === "Delete Courses") setOpenFromDialogDeleteCourses(true)
    if (data === "Add Unit / Subject") setOpenFromDialogAddUnitSubject(true)
    if (data === "Edit Unit / Subject Data") setOpenFromDialogEditUnitSubjectData(true)
    if (data === "Delete Unit / Subject") setOpenFromDialogDeleteUnitSubject(true)
    if (data === "Add Lectures") setOpenFromDialogAddLectures(true)
    if (data === "Edit Lectures Data") setOpenFromDialogEditLecturesData(true)
    if (data === "Delete Lectures") setOpenFromDialogDeleteLectures(true)
}




{/* "Add Courses" */ }
<Dialog open={openFromDialogAddCourses}>
    <DialogTitle>Add Courses</DialogTitle>
    <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenFromDialogAddCourses(false)}>Cancel</Button>
        <Button >Subscribe</Button>
    </DialogActions>
</Dialog>

{/* "Edit Courses Data" */ }
<Dialog open={openFromDialogEditCoursesData}>
    <DialogTitle>Edit Courses Data</DialogTitle>
    <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenFromDialogEditCoursesData(false)} >Cancel</Button>
        <Button >Subscribe</Button>
    </DialogActions>
</Dialog>

{/* "Delete Courses" */ }
<Dialog open={openFromDialogDeleteCourses} >
    <DialogTitle>Delete Courses</DialogTitle>
    <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenFromDialogDeleteCourses(false)}>Cancel</Button>
        <Button >Subscribe</Button>
    </DialogActions>
</Dialog>

{/* "Add Unit / Subject" */ }
<Dialog open={openFromDialogAddUnitSubject} >
    <DialogTitle>Add Unit / Subject</DialogTitle>
    <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenFromDialogAddUnitSubject(false)}>Cancel</Button>
        <Button >Subscribe</Button>
    </DialogActions>
</Dialog>

{/* "Edit Unit / Subject Data" */ }
<Dialog open={openFromDialogEditUnitSubjectData} >
    <DialogTitle>Edit Unit / Subject Data</DialogTitle>
    <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenFromDialogEditUnitSubjectData(false)}>Cancel</Button>
        <Button >Subscribe</Button>
    </DialogActions>
</Dialog>

{/* "Delete Unit / Subject" */ }
<Dialog open={openFromDialogDeleteUnitSubject} >
    <DialogTitle>Delete Unit / Subject</DialogTitle>
    <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenFromDialogDeleteUnitSubject(false)}>Cancel</Button>
        <Button >Subscribe</Button>
    </DialogActions>
</Dialog>

{/* "Add Lectures" */ }
<Dialog open={openFromDialogAddLectures} >
    <DialogTitle>Add Lectures</DialogTitle>
    <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenFromDialogAddLectures(false)}>Cancel</Button>
        <Button >Subscribe</Button>
    </DialogActions>
</Dialog>

{/* "Edit Lectures Data" */ }
<Dialog open={openFromDialogEditLecturesData} >
    <DialogTitle>Edit Lectures Data</DialogTitle>
    <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenFromDialogEditLecturesData(false)}>Cancel</Button>
        <Button >Subscribe</Button>
    </DialogActions>
</Dialog>

{/* "Delete Lectures" */ }
<Dialog open={openFromDialogDeleteLectures} >
    <DialogTitle>Delete Lectures</DialogTitle>
    <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenFromDialogDeleteLectures(false)}>Cancel</Button>
        <Button >Subscribe</Button>
    </DialogActions>
</Dialog>

