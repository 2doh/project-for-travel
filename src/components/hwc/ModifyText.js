import React from "react";

const ModifyText = ({ onSave, onEdit, onReset, isEditing }) => {
  return (
    <form onSubmit={onSave}>
      {isEditing ? (
        <>
          <button type="button" className="index-foor-back" onClick={onReset}>
            삭제
          </button>
          <button type="submit" className="index-page-save">
            저장
          </button>
        </>
      ) : (
        <button type="button" className="index-foor-back" onClick={onEdit}>
          수정
        </button>
      )}
    </form>
  );
};

export default ModifyText;
