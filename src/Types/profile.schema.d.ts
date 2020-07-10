import { law_universities_ng } from "../Database/entities/sql/_user-and-administrative-schema/Law_universities_ng";
import { law_schools_ng } from "../Database/entities/sql/_user-and-administrative-schema/Law_schools_ng";
import { user_role } from "../Database/entities/sql/_user-and-administrative-schema/User_role";
import { marketers } from "../Database/entities/sql/_user-and-administrative-schema/Marketers";

declare namespace _profileSchema {
  interface postRegistration {
    // profile fields updatable right after regisration
    first_name?: string;

    last_name?: string;

    user_name?: string;

    phone_number?: string;

    role?: number | user_role;

    password?: string;

    refferal_number?: string;

    marketer_id?: marketers;

    picture_url?: string;

    student_type?: boolean; // if declared as student must be true and select either A or B

    admission_year?: string;

    law_school?: number | law_schools_ng; // A id of selcetd law school

    law_universitiy?: number | law_universities_ng; // B id of selected law university

    uL_student_number?: string;
  }

  type regisration_method = "o_auth" | "local";
}
