import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableAtFormatted = format(
    props.availableAt,
    "EEEE' • 'd' de 'MMMM ' • 'k'h'MM ",
    {
      locale: ptBR,
    }
  );

  const isActiveLesson = props.slug === slug;
  //  ${isActiveLesson} ? 'bg-green-500: ''

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availableAtFormatted}</span>
      <div
        className={classNames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
          {
            "bg-green-500": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classNames(
                "flex items-center gap-2 text-sm  font-medium",
                {
                  "text-white": isActiveLesson,
                  "text-blue-500": !isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} /> Conteúdo Liberado
            </span>
          ) : (
            <span
              className={classNames(
                "flex items-center gap-2 text-sm  font-medium",
                {
                  "text-white": isActiveLesson,
                  "text-orange-500": !isActiveLesson,
                }
              )}
            >
              <Lock size={20} /> Em breve
            </span>
          )}
          <span
            className={classNames(
              "text-xs rounded px-2 py-[0.125rem] text-white border font-bold",
              {
                "border-white": isActiveLesson,
                "border-green-500": !isActiveLesson,
              }
            )}
          >
            {props.type === "live" ? "AO VIVO" : "AULA PRATICA"}
          </span>
        </header>
        <strong
          className={classNames("mt-5 block", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
}
