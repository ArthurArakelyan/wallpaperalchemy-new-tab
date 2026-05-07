import { type FC, useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { backgroundMessages } from "../../../locales/messages";
import { DebounceInput } from "../../shared";
import CategoryIcon from "../../shared/WallpaperAlchemy/components/Icon/icons/Category";
import Loader from "../../shared/WallpaperAlchemy/components/Loader";
import { assertSuccess } from "../../shared/WallpaperAlchemy/helpers/assert";
import {
  getTagImage,
  getTagImageHeight,
  getTagImageWidth,
} from "../../shared/WallpaperAlchemy/helpers/tag";
import { ITag } from "../../shared/WallpaperAlchemy/types";
import BaseSettings from "../base/BaseSettings";
import { getTags } from "./api";
import { defaultData, Props } from "./types";

const WallpaperAlchemyCategoriesSettings: FC<Props> = ({
  data = defaultData,
  setData,
}) => {
  const selectedTag = data.tag;

  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const sortedTags = useMemo(() => {
    if (!tags) return [];

    const result = [];

    let selected = null;

    for (const tag of tags) {
      if (tag.id === selectedTag) selected = tag;
      else result.push(tag);
    }

    return selected ? [selected, ...result] : tags;
  }, [tags, selectedTag]);

  const intl = useIntl();

  const handleGetTags = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getTags(intl.locale, {
        search: search.trim() || undefined,
      });

      assertSuccess(response);

      setTags(response.data.data);
    } catch (error: any) {
      console.error(error);

      if (typeof error.message === "string") {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTags = (tag: number) => {
    setData({ ...data, tag });
  };

  useEffect(() => {
    handleGetTags();
  }, [intl.locale, search]);

  return (
    <div className="WallpaperAlchemyCategoriesSettings">
      <BaseSettings data={data} setData={setData} />

      <div className="tagsSection">
        <label>
          <FormattedMessage {...backgroundMessages.search} />
          <DebounceInput
            type="text"
            value={search}
            placeholder={intl.formatMessage(backgroundMessages.search)}
            onChange={setSearch}
            wait={500}
          />
        </label>

        {!!tags.length && (
          <span className="tagsTitle">
            <FormattedMessage
              {...backgroundMessages.wallpaperAlchemyTagsMessage}
            />
          </span>
        )}

        {loading && (
          <div className="tagsLoading">
            <Loader />
          </div>
        )}

        {error && (
          <div className="tagsError">
            <span className="tagsErrorTitle">
              <FormattedMessage
                {...backgroundMessages.wallpaperAlchemyDefaultErrorMessage}
              />
            </span>

            <button
              type="button"
              className="button button--primary tagsErrorButton"
              onClick={handleGetTags}
            >
              <FormattedMessage {...backgroundMessages.tryAgain} />
            </button>
          </div>
        )}

        {!!sortedTags.length && (
          <div className="tags">
            {sortedTags.map((tag) => {
              const image = getTagImage(tag);

              const isSelected = tag.id === selectedTag;

              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleSelectTags(tag.id)}
                  className={`tag ${isSelected ? "tag--selected" : ""}`}
                >
                  <div className="tagImageWrapper">
                    {image ? (
                      <img
                        src={image}
                        alt={tag.title}
                        width={getTagImageWidth(tag)}
                        height={getTagImageHeight(tag)}
                        loading="lazy"
                        className="tagImage"
                      />
                    ) : (
                      <CategoryIcon className="tagEmptyIcon" />
                    )}
                  </div>

                  <div className="tagInfo">
                    <span className="tagName">{tag.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WallpaperAlchemyCategoriesSettings;
