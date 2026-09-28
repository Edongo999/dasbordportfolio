import axiosInstance from "@/components/utils/axiosInstance";

export interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;

  id?: number;

  name: string;

  email: string;

  image_url?: string;
}

export interface ProfileResponse {
  status: string;

  user: User;
}

export interface UpdatePasswordPayload {
  current_password: string;

  new_password: string;

  new_password_confirmation: string;
}

const userService = {
  profile: () =>
    axiosInstance.get<ProfileResponse>(
      "/user/profile"
    ),

  updateName: (data: { name: string }) =>
    axiosInstance.post(
      "/user/update-name",
      data
    ),

  updatePhoto: (formData: FormData) =>
    axiosInstance.post(
      "/user/update-photo",
      formData
    ),

  updatePassword: (data: UpdatePasswordPayload) =>
    axiosInstance.post(
      "/user/update-password",
      data
    ),
};

export default userService;