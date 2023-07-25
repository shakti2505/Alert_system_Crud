import AlertModel from "../models/AlertModel.js";

class AlertController {
    static homePage = async (req, res) => {
        try {
            const [Allalerts, AlertCount] = await Promise.all([
                AlertModel.find(),
                AlertModel.countDocuments(),
            ]);
            res.render('createAlert', {
                data: Allalerts,
                AlertCount,
                title: "Alert system"
            });
        } catch (error) {
            handleServerError(res, error);
        }
    }

    static createAlert = async (req, res) => {
        try {
            const { title, alertDate, alertTime, AlertType } = req.body;
            const newAlert = new AlertModel({
                title,
                timeInput: alertTime,
                AlertDate: alertDate,
                AlertType
            });
            await newAlert.save();
            res.redirect('/');
        } catch (error) {
            handleServerError(res, error);
        }
    }

    static deleteAlert = async (req, res) => {
        try {
            await AlertModel.findByIdAndDelete(req.params.id);
            res.redirect('/');
        } catch (error) {
            handleServerError(res, error);
        }
    }

    static activeAlert = async (req, res) => {
        try {
            const activeAlert = await AlertModel.find();
            res.render('ActiveAlerts', {
                data: activeAlert,
                title: "Active Alerts"
            });
        } catch (error) {
            handleServerError(res, error);
        }
    }
}

function handleServerError(res, error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}

export default AlertController;
