import type { IFile } from "~/types/folder.interface";

export const aboutFile: IFile = {
  id: "about_compiler",
  name: "about.compiler",
  content:
    "// Hi, this is your code compiler \n\n\n\n// try to run me \n\n\nlet hello = 'Hello from compiler'; \nconsole.log(hello);",
  extension: "js",
  isSaved: true,
};
